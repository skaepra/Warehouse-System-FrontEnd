import { motion, AnimatePresence } from "framer-motion";
import {
  IoChevronDownOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoCallOutline,
  IoHomeOutline,
} from "react-icons/io5";

import { orderType } from "../types/orderType";
import { getPaymentMethodLabel, getPaymentStatusBadge, getStatusBadge } from "../Helpers/orderBadges";


interface OrderItemCardProps {
  order: orderType;
  isExpanded: boolean;
  onToggleExpand: (id: string ) => void;
}

export default function OrderItemCard({
  order,
  isExpanded,
  onToggleExpand,
}: OrderItemCardProps) {
  const statusInfo = getStatusBadge(order.status);
  const paymentStatusInfo = getPaymentStatusBadge(order.paymentStatus);
  const PaymentMethodIcon = getPaymentMethodLabel(order.paymentMethod).icon;
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md"
    >
      {/* Order Main Header */}
      <div
        onClick={() => onToggleExpand(order.id)}
        className="p-4 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
              #{String(order.id).slice(-8)}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}
            >
              <StatusIcon className="text-sm" />
              {statusInfo.label}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Ordered on:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 dark:border-zinc-700/50">
          <div className="text-left">
            <span className="text-xs text-gray-400 block">Total Amount</span>
            <span className="text-base font-extrabold text-gray-900 dark:text-white">
              ${(order.totalAmount || 0).toFixed(2)}
            </span>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="p-2 rounded-full bg-gray-50 dark:bg-zinc-700/50 text-gray-500 dark:text-gray-300"
          >
            <IoChevronDownOutline className="text-lg" />
          </motion.div>
        </div>
      </div>

      {/* Order Details Collapsible Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gray-100 dark:border-zinc-700/60 bg-gray-50/50 dark:bg-zinc-900/40 p-4 sm:p-6"
          >
            {/* Summary Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/40 text-xs">
              <div className="flex items-center gap-2">
                <PaymentMethodIcon className="text-base text-gray-400" />
                <div>
                  <span className="text-gray-400 block">Payment Method:</span>
                  <span className="font-semibold">
                    {getPaymentMethodLabel(order.paymentMethod).label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-md font-semibold ${paymentStatusInfo.color}`}
                >
                  {paymentStatusInfo.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IoLocationOutline className="text-base text-rose-500" />
                <div>
                  <span className="text-gray-400 block">
                    Address & Coordinates:
                  </span>
                  <span className="font-medium block">
                    {order.City}, {order.Country}
                  </span>
                  {(order.dropoffLatitude !== 0 ||
                    order.dropoffLongitude !== 0) && (
                    <span className="font-mono text-[11px] text-gray-400">
                      {order.dropoffLatitude?.toFixed(4)},{" "}
                      {order.dropoffLongitude?.toFixed(4)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Info Section */}
            <div className="mb-6 p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/40 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <IoPersonOutline className="text-base text-indigo-500" />
                <div>
                  <span className="text-gray-400 block">Customer Name:</span>
                  <span className="font-semibold">{order.fullName}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IoCallOutline className="text-base text-emerald-500" />
                <div>
                  <span className="text-gray-400 block">Phone Number:</span>
                  <span className="font-semibold font-mono">{order.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IoHomeOutline className="text-base text-amber-500" />
                <div>
                  <span className="text-gray-400 block">
                    Address Details / Notes:
                  </span>
                  <span className="font-medium">
                    {order.building || order.Notes || "No additional details"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items Table */}
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Ordered Items ({order.items?.length || 0})
            </h4>

            <div className="space-y-2">
              {order.items?.map((item: any, idx: number) => {
                const name =
                  item.ProductName || item.productName || "Unnamed Product";
                const unitPrice = item.unitPrice || 0;
                const quantity = item.quantity || 1;
                const lineTotal =
                  item.lineTotal ?? unitPrice * quantity;

                const colorsArray = Array.isArray(item.Colors)
                  ? item.Colors
                  : item.color
                  ? [item.color]
                  : [];

                return (
                  <div
                    key={item.id || idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/30 text-xs sm:text-sm"
                  >
                    <div className="space-y-1">
                      <h5 className="font-semibold text-gray-900 dark:text-white">
                        {name}
                      </h5>
                      {colorsArray.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 text-[11px]">
                            Color:
                          </span>
                          {colorsArray.map((colorVal: string, cIdx: number) => (
                            <span
                              key={cIdx}
                              className="px-1.5 py-0.5 text-[10px] rounded border border-gray-200 dark:border-zinc-700 font-mono"
                            >
                              {colorVal}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-gray-400 text-xs block">
                          ${unitPrice} × {quantity}
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          ${lineTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}