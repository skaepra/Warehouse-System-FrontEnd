import { 
 
  IoShieldCheckmarkOutline, 
  IoCashOutline, 
  IoTimeOutline,
  IoAlertCircleOutline,

} from "react-icons/io5";

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 pb-12 pt-20 px-6 xl:px-0">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-4">        
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Shipping & <span className=" text-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text dark:text-transparent">Delivery Info</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to know about our shipping options, delivery times, and order tracking.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoTimeOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Most orders are processed within 24 hours and delivered within 2-5 business days.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoCashOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Cash on Delivery</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Pay conveniently at your doorstep upon receiving your package.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoShieldCheckmarkOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Secure Packaging</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              All items are carefully inspected and packed with protective material before shipping.
            </p>
          </div>
        </div>

        {/* Shipping Methods Table */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Shipping Options & Rates
          </h2>
          <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold">
                <tr>
                  <th className="p-4">Method</th>
                  <th className="p-4">Estimated Time</th>
                  <th className="p-4">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Standard Delivery</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">3 - 5 Business Days</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">$4.99 (Free over $50)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Express Shipping</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">1 - 2 Business Days</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">$9.99</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900 dark:text-white">Same Day Delivery (Select Cities)</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">Within 24 Hours</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">$14.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Delivery Process / Steps */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            How Your Order Travels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border bg-gray-50 dark:dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-800 rounded-lg relative">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center mx-auto mb-3 text-xs">1</span>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Order Placed</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You receive a confirmation email.</p>
            </div>
            <div className="p-4 border bg-gray-50 dark:dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-800 rounded-lg relative">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center mx-auto mb-3 text-xs">2</span>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Processing</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">We pack your items with care.</p>
            </div>
            <div className="p-4 border bg-gray-50 dark:dark:bg-zinc-800/50 dark:border-zinc-800 rounded-lg relative">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center mx-auto mb-3 text-xs">3</span>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Dispatched</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tracking number sent to you.</p>
            </div>
            <div className="p-4 border  bg-gray-50 dark:dark:bg-zinc-800/50 dark:border-zinc-800 rounded-lg relative">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center mx-auto mb-3 text-xs">4</span>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Delivered</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Package arrives at your door.</p>
            </div>
          </div>
        </div>

        {/* Important Notice Box */}
        <div className="p-5 border border-amber-200 dark:border-amber-900/50 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 flex items-start gap-4">
          <IoAlertCircleOutline className="text-2xl shrink-0 mt-0.5 text-amber-500" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-semibold">Important Delivery Note</h4>
            <p className="leading-relaxed opacity-90">
              Please ensure your shipping address and phone number are correct during checkout to avoid delay. Deliveries are made Sunday through Thursday during standard working hours.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}