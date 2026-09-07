import { IoFunnelOutline } from "react-icons/io5";

interface Category {
  name: string;
  count: number;
}

interface DesktopSidebarProps {
  categories: Category[];
  selectedCategory: string;
  maxPrice: number;
  onSelectCategory: (category: string) => void;
  onMaxPriceChange: (price: number) => void;
}

export function DesktopSidebar({
  categories,
  selectedCategory,
  maxPrice,
  onSelectCategory,
  onMaxPriceChange,
}: DesktopSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
      {/* Categories Box */}
      <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-gray-200 dark:border-zinc-700/60 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <IoFunnelOutline className="text-indigo-500" />
          <span>Categories</span>
        </h3>

        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.name
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === cat.name
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider Box */}
      <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-gray-200 dark:border-zinc-700/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Max Price
          </h3>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            ${maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
      </div>
    </aside>
  );
}