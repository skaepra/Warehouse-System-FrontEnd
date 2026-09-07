import { IoBagCheckOutline } from "react-icons/io5";
import { useOrders } from "../hooks/useOrders";
import OrderItemCard from "../components/OrderItemCard";

export default function OrdersPage() {
  const { orders, loading, expandedOrderId, toggleExpand } = useOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 pb-10 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Order History
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track all your past and current orders and their status
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/60 rounded-2xl shadow-sm text-center">
              <span className="text-xs text-gray-400 block">
                Total Orders
              </span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {orders.length}
              </span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-800/40 rounded-3xl border border-gray-100 dark:border-zinc-800 p-8">
            <IoBagCheckOutline className="mx-auto text-5xl text-gray-300 dark:text-zinc-600 mb-3" />
            <h3 className="text-lg font-semibold">No orders yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              When you place an order, all its details will appear here.
            </p>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderItemCard
                key={order.id}
                order={order}
                isExpanded={expandedOrderId === order.id}
                onToggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}