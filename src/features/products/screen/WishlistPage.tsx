import { motion } from "framer-motion";
import { IoHeartOutline, IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { Product } from "../../products/types/product";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { hand } from "../store/productUiSlice";
import { selectWishlistItems } from "../store/WishlisSelectors";

import { ProductCard } from "../../shop/components/ProductCard";
import { useShoppingScreen } from "../../shop/hook/useShoppingScreen";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlistItems);
  const { actions } = useShoppingScreen();

  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    if (hand) dispatch(hand(id));
    navigate(`/product/${id}`);
    window.scrollTo({ top: 20 });
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 transition-colors duration-200 min-h-screen">
      {/* 2. Wishlist Products Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-20">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-10 text-center space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Favorite Products ({wishlist.length})
          </h2>
        </motion.div>

        {/* Empty State / Wishlist Grid */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4 max-w-md mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-rose-500 text-3xl shadow-sm">
              <IoHeartOutline />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Your wishlist is empty
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Looks like you haven't saved any items yet. Explore our
                collection and add your favorite pieces!
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25"
            >
              <IoBagHandleOutline className="text-base" />
              <span>Explore Collection</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product: Product, index: number) => {
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFav={actions.isProductInWishlist(product.id)}
                    onProductClick={actions.handleProductClick}
                    onToggleWishlist={actions.handleToggleWishlist}
                    onQuickAdd={actions.handleQuickAdd}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
