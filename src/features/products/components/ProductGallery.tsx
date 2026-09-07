import { motion } from "framer-motion";
import { IoHeart, IoHeartOutline, IoShareSocialOutline } from "react-icons/io5";
import { Product } from "../types/product";


interface ProductGalleryProps {
  product: Product;
  selectedImage: string;
  onSelectImage: (img: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductGallery({
  product,
  selectedImage,
  onSelectImage,
  isWishlisted,
  onToggleWishlist,
}: ProductGalleryProps) {
  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      <div className="relative aspect-square w-full sm:w-[250px] md:w-[350px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700/40">
        <motion.img
          key={selectedImage}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={selectedImage}
          alt={product.ImageAlt || product.Name}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={onToggleWishlist}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md active:scale-90 ${
              isWishlisted
                ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30"
                : "bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-200 hover:text-rose-500"
            }`}
            aria-label="Toggle Wishlist"
          >
            {isWishlisted ? (
              <IoHeart className="text-lg text-white" />
            ) : (
              <IoHeartOutline className="text-lg" />
            )}
          </button>

          <button className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:text-indigo-500 transition-colors shadow-md">
            <IoShareSocialOutline className="text-lg" />
          </button>
        </div>
      </div>

      {product.Images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {product.Images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectImage(img)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                selectedImage === img
                  ? "border-indigo-600 scale-95"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
