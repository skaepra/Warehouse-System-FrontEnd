import {
  IoBagCheckOutline,
  IoTimeOutline,
  IoCardOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoSyncOutline,
} from "react-icons/io5";

export const getStatusBadge = (status: number) => {
  switch (status) {
    case 0:
      return {
        label: "Pending",
        icon: IoTimeOutline,
        color:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      };
    case 1:
      return {
        label: "Processing",
        icon: IoSyncOutline,
        color:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      };
    case 2:
      return {
        label: "Shipped / Out for Delivery",
        icon: IoBagCheckOutline,
        color:
          "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      };
    case 3:
      return {
        label: "Completed",
        icon: IoCheckmarkCircleOutline,
        color:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      };
    case 4:
      return {
        label: "Cancelled",
        icon: IoCloseCircleOutline,
        color:
          "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      };
    default:
      return {
        label: "Unknown",
        icon: IoTimeOutline,
        color:
          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      };
  }
};

export const getPaymentStatusBadge = (status: number) => {
  switch (status) {
    case 1:
      return {
        label: "Paid",
        color:
          "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
      };
    case 0:
    default:
      return {
        label: "Unpaid",
        color:
          "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
      };
  }
};

export const getPaymentMethodLabel = (method: number) => {
  switch (method) {
    case 0:
      return { label: "Cash on Delivery", icon: IoCashOutline };
    case 1:
      return { label: "Credit Card", icon: IoCardOutline };
    default:
      return { label: "Other", icon: IoCardOutline };
  }
};