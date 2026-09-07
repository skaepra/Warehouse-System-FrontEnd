import { IoSearchOutline } from "react-icons/io5";

interface ShoppingHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function ShoppingHeader({ searchQuery, onSearchChange }: ShoppingHeaderProps) {
  return (
    <div className="bg-white dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800 py-8 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Explore Shop
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Browse through our wide variety of premium products.
            </p>
          </div>

          <div className="relative max-w-md w-full">
            <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white border border-transparent focus:border-indigo-500 focus:outline-none transition-all text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}