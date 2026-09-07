import { motion } from "framer-motion";
import { IoEyeOutline, IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { Product } from "../../products/types/product";

interface ProductCardProps {
  product: Product;
  isFav: boolean;
  onProductClick: (id: string) => void;
  onQuickAdd: (e: React.MouseEvent, product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export function ProductCard({
  product,
  isFav,
  onProductClick,
  onQuickAdd,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onClick={() =>{ onProductClick(product.id),window.scrollTo({ top: 20})}}
        className="group relative bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700/50 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors ${
            isFav
              ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30"
              : "bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-gray-200 hover:text-rose-500"
          }`}
          title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isFav ? (
            <IoHeart className="text-base text-white" />
          ) : (
            <IoHeartOutline className="text-base" />
          )}
        </button>

        <div className="relative aspect-square w-full bg-gray-100 dark:bg-zinc-900 overflow-hidden">
          <img
            src={product.Images[0]}
            alt={product.ImageAlt || product.Name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product.id);
              }}
              className="flex-1 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-gray-900 dark:text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1 hover:bg-white transition-colors"
            >
              <IoEyeOutline className="text-sm text-indigo-500" />
              <span className="hidden sm:inline">View</span>
            </button>

            <button
              onClick={(e) => onQuickAdd(e, product)}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              title="Add to Cart"
            >
              <IoCartOutline className="text-base" />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-indigo-500 uppercase">
              {product.Category || "General"}
            </span>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-1 mt-0.5">
              {product.Name}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-700/50">
            <span className="text-xs text-gray-400">Price</span>
            <span className="text-sm font-extrabold text-gray-900 dark:text-white">
              ${product.Price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}