import { motion } from "framer-motion";
import { IoSparkles, IoShieldCheckmarkOutline, IoCarOutline, IoRefreshOutline, IoBag } from "react-icons/io5";
import products from "../../../data/products";
import { Product } from "../../products/types/product";
import { ProductCard } from "../../shop/components/ProductCard";

import { AddedToast } from "../../shop/components/AddedToast";

import { useShoppingScreen } from "../../shop/hook/useShoppingScreen";
import { useNavigate } from "react-router-dom";
import Contener from "../../../shared/childern/contener";


const FEATURES = [
  { icon: IoCarOutline, title: "Free Shipping", desc: "On all orders over $5" },
  { icon: IoShieldCheckmarkOutline, title: "Secure Payment", desc: "100% secure payment methods" },
  { icon: IoRefreshOutline, title: "Easy Returns", desc: "15 days return policy" },
];

export default function Home() {
  const { state, actions } = useShoppingScreen();
   const navigate = useNavigate();

  const handleShopCollection = () => {
    navigate("/shop");
  };

  return (
     <Contener>
    <div className="bg-gray-50 dark:bg-zinc-900 transition-colors duration-200 min-h-screen">
      <AddedToast message={state.addedToast} />

      {/* 1. Hero Section */}
      <div className="relative w-full h-[480px] sm:h-[540px] bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop')] bg-center bg-cover bg-no-repeat flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="relative z-10 text-center px-4 max-w-2xl space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20"
          >
            <IoSparkles className="text-amber-400" />
            <span>New Collection Available</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Elevate Your Everyday Style
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-200 font-light max-w-lg mx-auto"
          >
            Discover our handpicked selection of premium products crafted for quality and perfection.
          </motion.p>
       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={handleShopCollection}
              className="inline-block  dark:bg  hover:bg-indigo-600/90 font-semibold px-5 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm  justify-center bg-indigo-600 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white "
            >
              <div className="flex justify-center space-x-2">
             <IoBag className="text-base" />
              <p>Shop Collection</p>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
   

      {/* 2. Value Propositions Bar */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center justify-center gap-4 p-2">
                <div className="p-3 rounded-full bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Products Section */}
      <div id="products-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-10 text-center space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {(products as Product[]).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFav={actions.isProductInWishlist(product.id)}
              onProductClick={actions.handleProductClick}
              onToggleWishlist={actions.handleToggleWishlist}
              onQuickAdd={actions.handleQuickAdd}
            />
          ))}
        </div>
      </div>
    </div>
      </Contener>
  );
}