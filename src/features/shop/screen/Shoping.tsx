import { motion, AnimatePresence } from "framer-motion";
import { IoFunnelOutline, IoOptionsOutline } from "react-icons/io5";
import { AddedToast } from "../components/AddedToast";
import { ShoppingHeader } from "../components/ShoppingHeader";
import { useShoppingScreen } from "../hook/useShoppingScreen";
import { DesktopSidebar } from "../components/DesktopSidebar";
import { ProductCard } from "../components/ProductCard";
import { MobileFilterDrawer } from "../components/MobileFilterDrawer";

export default function ShoppingScreen() {
  const { state, actions } = useShoppingScreen();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 pt-20 pb-16 transition-colors duration-200">
      <AddedToast message={state.addedToast} />

      <ShoppingHeader
        searchQuery={state.searchQuery}
        onSearchChange={actions.setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DesktopSidebar
            categories={state.categories}
            selectedCategory={state.selectedCategory}
            maxPrice={state.maxPrice}
            onSelectCategory={actions.setSelectedCategory}
            onMaxPriceChange={actions.setMaxPrice}
          />

          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-gray-200 dark:border-zinc-700/60">
              <div className="flex items-center gap-2 overflow-x-auto lg:hidden pb-1 w-full sm:w-auto">
                <button
                  onClick={() => actions.setIsFilterMobileOpen(true)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-700 rounded-xl text-xs font-bold flex items-center gap-1 text-gray-800 dark:text-gray-200"
                >
                  <IoFunnelOutline /> Filter
                </button>
                {state.categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => actions.setSelectedCategory(cat.name)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      state.selectedCategory === cat.name
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="text-gray-900 dark:text-white font-bold">
                  {state.filteredProducts.length}
                </span>{" "}
                Products
              </span>

              <div className="flex items-center gap-3 ml-auto">
                <label className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">
                  Sort by:
                </label>
                <select
                  value={state.sortBy}
                  onChange={(e) => actions.setSortBy(e.target.value)}
                  className="bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white text-xs font-medium px-3 py-2 rounded-xl border border-transparent focus:border-indigo-500 outline-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid / Empty State */}
            {state.filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
              >
                <AnimatePresence>
                  {state.filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFav={actions.isProductInWishlist(product.id)}
                      onProductClick={actions.handleProductClick}
                      onQuickAdd={actions.handleQuickAdd}
                      onToggleWishlist={actions.handleToggleWishlist}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700/50">
                <IoOptionsOutline className="mx-auto text-4xl text-gray-400 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  No Products Found
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Try adjusting your category or search filter settings.
                </p>
                <button
                  onClick={actions.handleResetFilters}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={state.isFilterMobileOpen}
        categories={state.categories}
        selectedCategory={state.selectedCategory}
        maxPrice={state.maxPrice}
        onClose={() => actions.setIsFilterMobileOpen(false)}
        onSelectCategory={actions.setSelectedCategory}
        onMaxPriceChange={actions.setMaxPrice}
      />
    </div>
  );
}
