import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBack, IoCheckmark } from "react-icons/io5";
import { useProductDetails } from "../hooks/useProductDetails";
import ProductGallery from "../components/ProductGallery";
import ProductOptions from "../components/ProductOptions";
import ProductTabs from "../components/ProductTabs";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetails() {
  const {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    activeTab,
    setActiveTab,
    addedToast,
    isWishlisted,
    handleAddToCart,
    handleToggleWishlist,
    relatedProducts,
    navigate,
  } = useProductDetails();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          The product you are looking for does not exist or was removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-all shadow-md"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white pt-20 pb-16 transition-colors duration-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400/30"
          >
            <IoCheckmark className="text-xl bg-white/20 rounded-full p-0.5" />
            <span className="text-xs font-semibold">
              Added to your shopping cart!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <IoChevronBack className="text-base" />
          <span>Back</span>
        </button>

        {/* Top Product Details Section */}
        <div className="sm:flex grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-zinc-800/80 p-6 sm:p-8 rounded-3xl border border-gray-200/80 dark:border-zinc-700/60 shadow-sm">
          <ProductGallery
            product={product}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
            isWishlisted={isWishlisted}
            onToggleWishlist={handleToggleWishlist}
          />

          <ProductOptions
            product={product}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            quantity={quantity}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onAddToCart={handleAddToCart}
            onBuyNow={() => {
              handleAddToCart();
              navigate("/cart");
            }}
          />
        </div>

        {/* Tabs Section */}
        <ProductTabs
          product={product}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
