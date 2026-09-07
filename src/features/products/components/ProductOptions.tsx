import {
  IoStar,
  IoStarOutline,
  IoCheckmark,
  IoCartOutline,
  IoBagCheckOutline,
  IoCarOutline,
  IoSyncOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { Product } from "../types/product";

interface ProductOptionsProps {
  product: Product;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export default function ProductOptions({
  product,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBuyNow,
}: ProductOptionsProps) {
  return (
    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            {product.Category}
          </span>

          <div className="flex items-center gap-1 text-amber-400 text-sm">
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStarOutline className="text-gray-300 dark:text-zinc-600" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1">
              (4.8 / 5)
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {product.Name}
        </h1>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            ${product.Price}
          </span>
          <span className="text-sm text-gray-400 line-through font-medium">
            ${(product.Price * 1.2).toFixed(0)}
          </span>
          <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
            Save 20%
          </span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
          {product.Description}
        </p>

        <hr className="border-gray-100 dark:border-zinc-700/60" />

        {/* Color Selection */}
        {product.Colors && product.Colors.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Color
            </label>
            <div className="flex items-center gap-2.5">
              {product.Colors.map((color, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => onSelectColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === color
                      ? "border-indigo-600 scale-110 shadow-md"
                      : "border-gray-300 dark:border-zinc-700 opacity-80"
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <IoCheckmark className="text-white text-xs drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.Sizes && product.Sizes.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Select Size
            </label>
            <div className="flex items-center gap-2">
              {product.Sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectSize(size)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSize === size
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-gray-100 dark:bg-zinc-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Quantity
          </label>
          <div className="flex items-center gap-3 max-w-[140px]">
            <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-zinc-700/60 rounded-xl p-1">
              <button
                onClick={onDecrement}
                className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 font-bold flex items-center justify-center shadow-sm hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-sm font-extrabold px-2">{quantity}</span>
              <button
                onClick={onIncrement}
                className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 font-bold flex items-center justify-center shadow-sm hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions & Benefits */}
      <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-zinc-700/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onAddToCart}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:shadow-md dark:shadow-purple-500/20 dark:hover:shadow-purple-500/40 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
          >
            <IoCartOutline className="text-lg" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={onBuyNow}
            className="w-full py-3.5 px-4 bg-slate-900/85 hover:bg-slate-900/80 dark:bg-zinc-100 dark:hover:bg-white dark:text-gray-900 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <IoBagCheckOutline className="text-lg" />
            <span>Buy Now</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 text-[10px] text-gray-500 dark:text-gray-400 font-medium text-center">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
            <IoCarOutline className="text-base text-indigo-500" />
            <span>Free Shipping</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
            <IoSyncOutline className="text-base text-indigo-500" />
            <span>15 Days Return</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
            <IoShieldCheckmarkOutline className="text-base text-indigo-500" />
            <span>2 Year Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
