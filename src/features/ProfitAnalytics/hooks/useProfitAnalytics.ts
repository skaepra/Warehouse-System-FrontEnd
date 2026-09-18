import { useState, useEffect, useMemo, useCallback } from "react";
import { invoiceService, InvoiceResponseDto } from "../../invoice/services/invoiceService";
import { productService, Product } from "../../products/services/productService";
import { purchaseService, PurchaseResponseDto } from "../../Purchases/services/purchaseService";

export interface ProductPerformance {
  productId: string;
  name: string;
  revenue: number;        // إجمالي المبيعات
  cost: number;           // إجمالي التكلفة للمباع
  profit: number;         // صافي الربح للمنتج
  unitsSold: number;      // عدد القطع المباعة
  profitMargin: string;   // نسبة هامش الربح %
}

export interface ProfitAnalyticsData {
  totalRevenue: number;           // إجمالي المبيعات (الإيرادات)
  totalCostOfGoodsSold: number;   // إجمالي تكلفة البضاعة المباعة (COGS)
  totalExpenses: number;          // إجمالي المشتريات الفعلية من الموردين
  netProfit: number;              // صافي الربح التشغيلي (الإيرادات - تكلفة المباع)
  profitMargin: string;           // هامش الربح الإجمالي %
  totalInvoicesCount: number;     // عدد الفواتير
  totalPurchasesCount: number;    // عدد عمليات الشراء
  totalPurchasesCost: number;     // إجمالي المشتريات النقدي
  totalStockCostValue: number;    // قيمة المخزون الحالي بسعر التكلفة
  totalStockSellingValue: number; // قيمة المخزون الحالي بسعر البيع
  topProfitableProducts: ProductPerformance[]; // أعلى المنتجات ربحية
  allProductPerformance: ProductPerformance[]; // تحليل أداء كل المنتجات
}

export const useProfitAnalytics = () => {
  const [invoices, setInvoices] = useState<InvoiceResponseDto[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<PurchaseResponseDto[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // جلب البيانات مع التفاصيل الكاملة للفواتير
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [rawInvoices, productsData, purchasesData] = await Promise.all([
        invoiceService.getAllInvoices(),
        productService.getAllProducts(),
        purchaseService.getAllPurchases(),
      ]);

      // جلب تفاصيل عناصر كل فاتورة بالتوازي لجلب (items)
      const fullInvoices = await Promise.all(
        rawInvoices.map(async (inv) => {
          try {
            return await invoiceService.getInvoiceDetails(inv.invoiceId);
          } catch {
            return inv; // في حال فشل جلب التفاصيل تُعطى الفاتورة بدون items
          }
        })
      );

      setInvoices(fullInvoices);
      setProducts(productsData);
      setPurchases(purchasesData);
    } catch (err: any) {
      console.error("Error fetching profit analytics data:", err);
      setError(err?.response?.data?.message || "حدث خطأ أثناء جلب بيانات التحليلات المالية");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // حساب التحليلات المالية
  const analytics = useMemo<ProfitAnalyticsData>(() => {
    // 1. خريطة للمنتجات لسرعة الوصول لسعر التكلفة الحالي
    const productMap = new Map<string, Product>();
    products.forEach((p) => productMap.set(p.id, p));

    // 2. حساب إجمالي المبيعات (الإيرادات)
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

    // 3. حساب إجمالي مصروف المشتريات النقدي الفعلي من الموردين
    const totalPurchasesCost = purchases.reduce((sum, pur) => sum + (pur.totalCost || 0), 0);

    // 4. تجميع تحليل المبيعات وتكلفة المباع بناءً على عناصر الفواتير (Invoice Items)
    const productStatsMap = new Map<string, { revenue: number; cost: number; unitsSold: number; name: string }>();

    invoices.forEach((inv) => {
      if (inv.items && inv.items.length > 0) {
        inv.items.forEach((item) => {
          const matchedProduct = productMap.get(item.productId);
          const unitCost = matchedProduct ? matchedProduct.costPrice : 0;

          const currentStats = productStatsMap.get(item.productId) || {
            revenue: 0,
            cost: 0,
            unitsSold: 0,
            name: item.productName || matchedProduct?.name || "منتج غير معرف",
          };

          const itemRevenue = item.totalPrice || item.quantity * item.unitSellingPrice;
          const itemCost = item.quantity * unitCost;

          productStatsMap.set(item.productId, {
            name: currentStats.name,
            revenue: currentStats.revenue + itemRevenue,
            cost: currentStats.cost + itemCost,
            unitsSold: currentStats.unitsSold + item.quantity,
          });
        });
      }
    });

    // 5. تحويل البيانات وتجهيز تقرير أداء المنتجات
    let totalCostOfGoodsSold = 0;

    const productPerformance: ProductPerformance[] = Array.from(productStatsMap.entries()).map(([productId, stats]) => {
      const profit = stats.revenue - stats.cost;
      totalCostOfGoodsSold += stats.cost;
      const margin = stats.revenue > 0 ? ((profit / stats.revenue) * 100).toFixed(1) : "0.0";

      return {
        productId,
        name: stats.name,
        revenue: stats.revenue,
        cost: stats.cost,
        profit,
        unitsSold: stats.unitsSold,
        profitMargin: `${margin}%`,
      };
    });

    // ترتيب المنتجات حسب الأكثر ربحية
    const sortedByProfit = [...productPerformance].sort((a, b) => b.profit - a.profit);
    const topProfitableProducts = sortedByProfit.slice(0, 5);

    // 6. صافي الربح التشغيلي والهامش الإجمالي
    const netProfit = totalRevenue - totalCostOfGoodsSold;
    const overallMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : "0.0";

    // 7. حساب قيمة المخزون الحالي
    let totalStockCostValue = 0;
    let totalStockSellingValue = 0;

    products.forEach((p) => {
      totalStockCostValue += p.quantityInStock * p.costPrice;
      totalStockSellingValue += p.quantityInStock * p.sellingPrice;
    });

    return {
      totalRevenue,
      totalCostOfGoodsSold,
      totalExpenses: totalPurchasesCost, // المشتريات الفعلية كمصروفات نقدية
      netProfit,
      profitMargin: `${overallMargin}%`,
      totalInvoicesCount: invoices.length,
      totalPurchasesCount: purchases.length,
      totalPurchasesCost,
      totalStockCostValue,
      totalStockSellingValue,
      topProfitableProducts,
      allProductPerformance: sortedByProfit,
    };
  }, [invoices, products, purchases]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchData,
  };
};