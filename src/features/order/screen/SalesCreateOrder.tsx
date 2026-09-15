import React, { useEffect, useState } from "react";

import { CreateOrderDto, orderService } from "../services/orderService";
import {
  IoSearchOutline,
  IoCartOutline,
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoPersonOutline,
  IoCheckmarkCircleOutline,
  IoRefreshOutline,
  IoCubeOutline,
} from "react-icons/io5";
import { Product } from "../../products/types/product";
import { productService } from "../../products/services/productService";

interface CartItem {
  product: Product;
  quantity: number;
  unitSellingPrice: number;
}

export const SalesCreateOrder: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // بيانات الطلب
  const [customerName, setCustomerName] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // جلب المنتجات المتاحة فقط
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      // إظهار المنتجات النشطة والتي تحتوي على مخزون فقط
      const activeProducts = data.filter(
        (p) => p.isActive && p.quantityInStock > 0
      );
      setProducts(activeProducts);
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ أثناء جلب المنتجات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // إضافة منتج للسلة
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.quantityInStock) return prevCart; // عدم تجاوز المخزون
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          product,
          quantity: 1,
          unitSellingPrice: product.sellingPrice,
        },
      ];
    });
  };

  // تعديل كمية عنصر في السلة
  const updateQuantity = (productId: string, newQty: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const validQty = Math.min(
              Math.max(1, newQty),
              item.product.quantityInStock
            );
            return { ...item, quantity: validQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // تعديل سعر البيع للقطعة (اختياري حسب صلاحية المندوب)
  const updatePrice = (productId: string, newPrice: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, unitSellingPrice: Math.max(0, newPrice) }
          : item
      )
    );
  };

  // حذف عنصر من السلة
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // حساب الإجمالي
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.unitSellingPrice,
    0
  );

  // إرسال الطلب
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("يرجى إدخال اسم الزبون.");
      return;
    }
    if (cart.length === 0) {
      alert("يرجى إضافة منتج واحد على الأقل للطلب.");
      return;
    }

    const payload: CreateOrderDto = {
      customerName: customerName.trim(),
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitSellingPrice: item.unitSellingPrice,
      })),
    };

    try {
      setSubmitting(true);
      setError(null);
      await orderService.createOrder(payload);
      setSuccessMessage("تم إنشاء الطلب بنجاح!");
      setCart([]);
      setCustomerName("");
      fetchProducts(); // إعادة جلب المنتجات لتحديث الكميات المتاحة
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء حفظ الطلب."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-bg text-brand-primary">
        <IoRefreshOutline className="animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-brand-bg min-h-screen text-brand-text dir-rtl mt-12" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-text mb-1">
            إنشاء طلب جديد
          </h1>
          <p className="text-brand-subtext text-sm">
            قم بجمع المنتجات وإدخال بيانات الزبون لإرسال الطلب.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-status-successBg text-status-success border border-status-success/20 rounded-xl text-sm flex items-center gap-2">
          <IoCheckmarkCircleOutline size={20} />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-status-dangerBg text-status-danger border border-status-danger/20 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قسم قائمة المنتجات (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* شريط البحث */}
          <div className="bg-brand-card p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <IoSearchOutline className="text-brand-subtext text-lg" />
            <input
              type="text"
              placeholder="البحث باسم المنتج أو رمز SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-brand-text placeholder:text-brand-subtext focus:outline-none"
            />
          </div>

          {/* شبكة الكروت للمنتجات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const cartItem = cart.find((i) => i.product.id === product.id);
                const isSelected = !!cartItem;

                return (
                  <div
                    key={product.id}
                    className={`bg-brand-card p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-brand-primary ring-1 ring-brand-primary/30"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-brand-text text-base">
                          {product.name}
                        </h3>
                        <span className="text-xs font-mono text-brand-subtext bg-slate-100 px-2 py-0.5 rounded">
                          {product.sku || "N/A"}
                        </span>
                      </div>
                      <div className="text-xs text-brand-subtext space-y-1 mb-4">
                        <div className="flex items-center gap-1">
                          <IoCubeOutline />
                          <span>
                            المخزون المتاح:{" "}
                            <strong className="text-brand-text">
                              {product.quantityInStock}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-xs text-brand-subtext block">السعر المقترح</span>
                        <span className="text-lg font-bold text-brand-primary">
                          ${product.sellingPrice.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.quantityInStock === 0}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                          isSelected
                            ? "bg-brand-primary/10 text-brand-primary"
                            : "bg-brand-primary text-white hover:bg-brand-primary/90"
                        }`}
                      >
                        <IoAddOutline size={16} />
                        {isSelected ? `مضاف (${cartItem.quantity})` : "إضافة للطلب"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full bg-brand-card p-12 text-center text-brand-subtext rounded-xl border border-slate-200">
                لا توجد منتجات متاحة تطابق بحثك.
              </div>
            )}
          </div>
        </div>

        {/* قسم تفاصيل الطلب / السلة (1/3) */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleSubmitOrder}
            className="bg-brand-card p-5 rounded-xl border border-slate-200 shadow-sm space-y-5 sticky top-20"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-brand-text">
              <IoCartOutline className="text-brand-primary text-xl" />
              <h2 className="font-bold text-lg">تفاصيل الطلب</h2>
            </div>

            {/* اسم الزبون */}
            <div>
              <label className="block text-xs font-semibold text-brand-subtext mb-1">
                اسم الزبون *
              </label>
              <div className="relative">
                <IoPersonOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-subtext" />
                <input
                  type="text"
                  required
                  placeholder="أدخل اسم الزبون الكامل"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pr-9 pl-3 py-2 bg-brand-bg border border-slate-200 rounded-lg text-sm text-brand-text focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* قائمة العناصر المختارة */}
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-brand-bg rounded-lg border border-slate-100 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-xs text-brand-text">
                        {item.product.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-status-danger hover:text-red-700 p-0.5"
                      >
                        <IoTrashOutline size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      {/* السعر للقطعة */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-brand-subtext">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitSellingPrice}
                          onChange={(e) =>
                            updatePrice(
                              item.product.id,
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-16 px-1 py-0.5 border border-slate-200 rounded text-xs text-brand-text text-center focus:outline-none"
                        />
                      </div>

                      {/* التحكم بالكمية */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-slate-100 text-brand-text"
                        >
                          <IoRemoveOutline size={14} />
                        </button>
                        <span className="px-2 text-xs font-bold text-brand-text">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-slate-100 text-brand-text"
                        >
                          <IoAddOutline size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-brand-subtext border border-dashed border-slate-200 rounded-lg">
                  لم يتم إضافة أي منتج للطلب بعد.
                </div>
              )}
            </div>

            {/* الحساب النهائي والتأكيد */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-subtext">المجموع الكلي:</span>
                <span className="text-xl font-extrabold text-brand-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting || cart.length === 0}
                className="w-full py-2.5 bg-brand-primary text-white font-semibold text-sm rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {submitting ? "جاري الحفظ..." : "تأكيد وإرسال الطلب"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};