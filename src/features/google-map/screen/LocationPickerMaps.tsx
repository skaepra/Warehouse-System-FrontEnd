import React, { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

// يفضل نقلها إلى .env
const MAPTILER_KEY =
  "yO5BCOXvi0MwW2kvjQf1";

const ORS_API_KEY =

  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQ3YWM5M2UxOGE5YjRjZjFiMTgxODU5ODQ1YzNjMDFkIiwiaCI6Im11cm11cjY0In0=";

type LocationType = {
  latitude: number;
  longitude: number;
};

type Props = {
  isPermissionDenied?: boolean;
  onConfirm?: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
};

const DEFAULT_COORDS: [number, number] = [36.2765, 33.5138];

export default function LocationPickerMaps({
  onConfirm,
  isPermissionDenied,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastLocationRef = useRef<LocationType | null>(null);

  const [selectedLocation, setSelectedLocation] =
    useState<LocationType>({
      longitude: DEFAULT_COORDS[0],
      latitude: DEFAULT_COORDS[1],
    });

  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  /*
  ========================================
  REVERSE GEOCODE
  ========================================
  */

  async function reverseGeocode(
    latitude: number,
    longitude: number
  ) {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://api.openrouteservice.org/geocode/reverse",
        {
          params: {
            api_key: ORS_API_KEY,
            "point.lat": latitude,
            "point.lon": longitude,
            "accept-language": "ar",
          },
        }
      );

      const label =
        response.data.features?.[0]?.properties?.label ??
        "عنوان غير معروف";

      setAddress(label);
    } catch (error) {
      console.error("Reverse Geocode Error:", error);

      setAddress("تعذر الحصول على العنوان");
    } finally {
      setLoading(false);
    }
  }

  /*
  ========================================
  INITIALIZE MAP
  ========================================
  */

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
      center: DEFAULT_COORDS,
      zoom: 13,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on("load", () => {
      reverseGeocode(
        DEFAULT_COORDS[1],
        DEFAULT_COORDS[0]
      );
    });

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        map.resize();
      });
    });

    resizeObserver.observe(mapContainerRef.current);

    map.on("moveend", () => {
      const center = map.getCenter();

      const newLoc = {
        latitude: center.lat,
        longitude: center.lng,
      };

      if (
        lastLocationRef.current &&
        Math.abs(
          lastLocationRef.current.latitude -
            newLoc.latitude
        ) < 0.0001 &&
        Math.abs(
          lastLocationRef.current.longitude -
            newLoc.longitude
        ) < 0.0001
      ) {
        return;
      }

      lastLocationRef.current = newLoc;

      setSelectedLocation(newLoc);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        reverseGeocode(
          newLoc.latitude,
          newLoc.longitude
        );
      }, 500);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      resizeObserver.disconnect();

      map.remove();

      mapRef.current = null;
    };
  }, []);
   /*
  ========================================
  GET CURRENT LOCATION
  ========================================
  */

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("متصفحك لا يدعم تحديد الموقع الجغرافي.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setSelectedLocation(coords);

        // حفظ آخر موقع لمنع تكرار reverseGeocode لنفس الإحداثيات
        lastLocationRef.current = coords;

        mapRef.current?.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 15,
          duration: 1500,
        });

        reverseGeocode(coords.latitude, coords.longitude);
      },
      (error) => {
        setLoading(false);

        console.error("Location Error:", error);

        alert(
          "تعذر تحديد موقعك الحالي. تأكد من منح إذن الوصول للموقع في المتصفح."
        );
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

  /*
  ========================================
  CONFIRM LOCATION
  ========================================
  */

  function handleConfirmLocation() {
    if (!selectedLocation) {
      alert("الرجاء تحديد موقع على الخريطة أولاً.");
      return;
    }

    onConfirm?.({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      address,
    });
  }

  return (
    <div style={styles.container}>
      {/* MAP */}
      <div
        ref={mapContainerRef}
        style={styles.map}
      />

      {/* CENTER MARKER */}
      <div style={styles.markerContainer}>
        <div style={styles.markerOuter}>
          <div style={styles.markerInner} />
        </div>
      </div>

      {/* BOTTOM CARD */}
      <div style={styles.bottomCard}>
        <h3 style={styles.title}>
          {isPermissionDenied
            ? "حدد موقعك يدوياً"
            : "اختر موقع التوصيل"}
        </h3>

        {loading ? (
          <div style={styles.loadingContainer}>
            <span style={styles.spinner}></span>

            <span style={styles.loadingText}>
              جاري تحديد العنوان...
            </span>
          </div>
        ) : (
          <p style={styles.addressText}>
            {address || "قم بتحريك الخريطة لتحديد الموقع"}
          </p>
        )}

        <button
          style={{
            ...styles.confirmButton,
            ...(loading
              ? styles.disabledButton
              : {}),
          }}
          disabled={loading}
          onClick={handleConfirmLocation}
        >
          تأكيد الموقع
        </button>
      </div>

      {/* CURRENT LOCATION BUTTON */}

      <button
        style={{
          ...styles.currentLocationButton,
          ...(isPermissionDenied
            ? { opacity: 0.6 }
            : {}),
        }}
        title="تحديد موقعي الحالي"
        onClick={getCurrentLocation}
      >
        ◎
      </button>
    </div>
  );
}

// التنسيقات باستخدام Inline CSS للتبسيط (يمكنك تحويلها لـ CSS Modules أو Tailwind)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    fontFamily: "sans-serif",
    direction: "rtl",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 10,
  },
  markerOuter: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 122, 255, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  markerInner: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#007AFF",
  },
  bottomCard: {
    position: "absolute",
    bottom: "30px",
    left: "20px",
    right: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#FFF",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 10,
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0",
  },
  loadingText: {
    fontSize: "14px",
    color: "#666",
  },
  addressText: {
    fontSize: "14px",
    color: "#444",
    margin: "10px 0",
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#007AFF",
    color: "#FFF",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "#A2C9FF",
    cursor: "not-allowed",
  },
  currentLocationButton: {
    position: "absolute",
    bottom: "220px",
    right: "20px",
    backgroundColor: "#FFF",
    border: "none",
    width: "50px",
    height: "50px",
    borderRadius: "25px",
    fontSize: "24px",
    color: "#007AFF",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 10,
  },
};