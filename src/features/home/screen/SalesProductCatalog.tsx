import React from "react";
import {
  IoSearchOutline,
  IoCartOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoCheckmarkCircleOutline,
  IoRefreshOutline,
  IoTrashOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { CreateOrderModal } from "../../order/components/CreateOrderModal";
import { useSalesCatalog } from "../hook/useSalesCatalog";

interface SalesProductCatalogProps {
  onProceedToOrder?: () => void;
}

export const SalesProductCatalog: React.FC<SalesProductCatalogProps> = () => {
  const {
    cart,
    loading,
    error,
    searchTerm,
    selectedCategory,
    categories,
    filteredProducts,
    isCartOpen,
    isOrderModalOpen,
    totalCartAmount,
    totalCartItemsCount,
    setSearchTerm,
    setSelectedCategory,
    setIsCartOpen,
    setIsOrderModalOpen,
    fetchProducts,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
  } = useSalesCatalog();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-bg">
        <IoRefreshOutline className="animate-spin text-4xl text-brand-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <p className="text-rose-500 font-semibold mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-xl"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div
      className="p-6 bg-brand-bg min-h-screen text-brand-text dir-rtl mt-12"
      dir="rtl"
    >
      {/* Header & Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            كتالوج المنتجات
          </h1>
          <p className="text-brand-subtext text-sm">
            استعرض المنتجات المتاحة وأضفها للسلة.
          </p>
        </div>
        <button
          onClick={fetchProducts}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-card border border-slate-200 text-brand-text text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
        >
          <IoRefreshOutline size={18} />
          تحديث الكتالوج
        </button>
      </div>

      {/* البحث والتصنيفات */}
      <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
          <input
            type="text"
            placeholder="بحث باسم المنتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-brand-primary text-white"
                  : "bg-brand-bg text-brand-subtext hover:bg-slate-200"
              }`}
            >
              {cat === "ALL" ? "جميع التصنيفات" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* قائمة الكروت */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-24">
        {filteredProducts.map((product) => {
          const cartItem = cart.find((i) => i.productId === product.id);
          const inCartQty = cartItem ? cartItem.quantity : 0;
          const isOutOfStock = product.availableStock <= 0;

          return (
            <div
              key={product.id}
              className={`bg-brand-card rounded-xl border p-4 shadow-sm flex flex-col justify-between transition-all ${
                inCartQty > 0
                  ? "border-brand-primary ring-1 ring-brand-primary/20"
                  : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-brand-subtext">
                    {product.categoryName || "عام"}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isOutOfStock
                        ? "bg-rose-50 text-rose-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {isOutOfStock
                      ? "غير متوفر"
                      : `المخزون: ${product.availableStock}`}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-brand-text mb-2 line-clamp-2">
                  {product.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-brand-subtext block">
                    السعر
                  </span>
                  <span className="text-base font-extrabold text-brand-primary">
                    ${product.unitSellingPrice.toFixed(2)}
                  </span>
                </div>

                {isOutOfStock ? (
                  <button
                    disabled
                    className="px-3 py-1.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-lg cursor-not-allowed"
                  >
                    غير متاح
                  </button>
                ) : inCartQty === 0 ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <IoAddOutline size={16} />
                    إضافة للسلة
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => handleDecreaseQuantity(product.id)}
                      className="p-1 bg-white hover:bg-slate-200 rounded text-brand-text transition-colors"
                    >
                      <IoRemoveOutline size={14} />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">
                      {inCartQty}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(product.id)}
                      disabled={inCartQty >= product.availableStock}
                      className="p-1 bg-white hover:bg-slate-200 rounded text-brand-text transition-colors disabled:opacity-40"
                    >
                      <IoAddOutline size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* شريط السلة العائم */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative p-3 bg-brand-primary rounded-xl">
              <IoCartOutline size={22} />
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                {totalCartItemsCount}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">إجمالي السلة</span>
              <span className="text-lg font-extrabold text-white">
                ${totalCartAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
            >
              عرض السلة ({cart.length})
            </button>
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-bold"
            >
              متابعة إنشاء الطلب
              <IoArrowForwardOutline size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Side Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-brand-card w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <h2 className="font-bold text-lg text-brand-text flex items-center gap-2">
                  <IoCartOutline size={20} />
                  سلة الشراء ({cart.length})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-brand-subtext hover:text-brand-text text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="p-3 bg-brand-bg rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-brand-text mb-1">
                        {item.productName}
                      </h4>
                      <p className="text-brand-subtext">
                        ${item.unitSellingPrice.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-brand-primary">
                        ${(item.unitSellingPrice * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg"
                      >
                        <IoTrashOutline size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-brand-subtext">
                  المجموع الكلي:
                </span>
                <span className="text-xl font-extrabold text-brand-primary">
                  ${totalCartAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full py-3 bg-brand-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                تأكيد ومتابعة إنشاء الطلب
                <IoCheckmarkCircleOutline size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <CreateOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSuccess={() => {
          alert("تم إنشاء الطلب بنجاح!");
          fetchProducts();
        }}
      />
    </div>
  );
};