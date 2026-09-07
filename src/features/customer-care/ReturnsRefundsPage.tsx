import  { useState } from "react";
import { 
  IoShieldCheckmarkOutline, 
  IoTimeOutline, 
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoChevronDown
} from "react-icons/io5";

export default function ReturnsRefundsPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 pb-12 pt-20 px-6 xl:px-0">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Returns & <span className=" text-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text dark:text-transparent">Refunds Policy</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Hassle-free returns within 14 days. We want you to be completely satisfied with your purchase.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoTimeOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">14-Day Return Window</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              You have 14 full days from delivery date to request a return or exchange.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoCardOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Fast Refunds</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Refunds are processed back to your original payment method within 3-5 business days after inspection.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoShieldCheckmarkOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Quality Guarantee</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              If your product arrives damaged or defective, we will replace it immediately at no extra cost.
            </p>
          </div>
        </div>

        {/* How to Return Steps */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Simple 3-Step Return Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border bg-gray-50  border-gray-200 dark:border-zinc-800 rounded-xl  dark:bg-zinc-900 space-y-2 relative">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Step 01</span>
              <h4 className="font-semibold text-base text-gray-900 dark:text-white">Submit Request</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Contact customer support or visit your account page to initiate a return request with your Order ID.
              </p>
            </div>

            <div className="p-5 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50  dark:bg-zinc-900 space-y-2 relative">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Step 02</span>
              <h4 className="font-semibold text-base text-gray-900 dark:text-white">Pack Your Item</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Place the item securely in its original packaging along with all tags and accessories.
              </p>
            </div>

            <div className="p-5 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50  dark:bg-zinc-900 space-y-2 relative">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Step 03</span>
              <h4 className="font-semibold text-base text-gray-900 dark:text-white">Get Refunded</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Our courier will pick up the package, and your refund will be issued once inspected.
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-emerald-200 dark:border-emerald-900/50 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <IoCheckmarkCircleOutline className="text-emerald-500 text-xl" />
              Eligible for Return
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                Items in original packaging with intact tags.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                Unused and undamaged physical products.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                Wrong or defective items received.
              </li>
            </ul>
          </div>

          <div className="p-6 border border-rose-200 dark:border-rose-900/50 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 space-y-4">
            <h3 className="font-semibold text-rose-900 dark:text-rose-300 flex items-center gap-2">
              <IoCloseCircleOutline className="text-rose-500 text-xl" />
              Non-Returnable Items
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                Items marked as Final Sale or Clearance.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                Personal care or hygiene products once opened.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                Products missing original components or tags.
              </li>
            </ul>
          </div>
        </div>

        {/* Frequently Asked Questions Mini-Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Refund FAQs
          </h2>
          
          <div className="space-y-3">
            {[
              {
                q: "What if I paid with Cash on Delivery (COD)?",
                a: "For COD orders, refunds can be issued as store credit instantly, or transferred via bank transfer upon request."
              },
              {
                q: "Who pays for return shipping?",
                a: "If the product is damaged or defective, shipping is 100% free. For standard returns or exchanges, a minor courier pickup fee may apply."
              },
              {
                q: "How long until I see my money back?",
                a: "Once the item reaches our warehouse and passes quality control, credit card refunds take 3-5 business days depending on your bank."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-gray-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-900 bg-gray-50 dark:text-white hover:bg-gray-100 dark:bg-zinc-800  dark:hover:bg-zinc-800/50 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <span className="font-semibold">{faq.q}</span>
                  <IoChevronDown
                    className={`text-indigo-500 transition-transform duration-200 text-base ${
                      activeAccordion === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === idx && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}