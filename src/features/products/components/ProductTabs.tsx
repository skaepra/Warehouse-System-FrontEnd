import { Product } from "../types/product";

interface ProductTabsProps {
  product: Product;
  activeTab: "description" | "details" | "reviews";
  onTabChange: (tab: "description" | "details" | "reviews") => void;
}

export default function ProductTabs({
  product,
  activeTab,
  onTabChange,
}: ProductTabsProps) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "details", label: "Specifications" },
    { id: "reviews", label: "Reviews (12)" },
  ] as const;

  return (
    <div className="mt-12 bg-white dark:bg-zinc-800/80 p-6 rounded-3xl border border-gray-200/80 dark:border-zinc-700/60">
      <div className="flex border-b border-gray-200 dark:border-zinc-700/60 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {activeTab === "description" && <p>{product.Description}</p>}

        {activeTab === "details" && (
          <ul className="space-y-2 list-disc list-inside">
            <li>
              Material: High quality organic cotton / synthetic components.
            </li>
            <li>Category: {product.Category}</li>
            <li>Item ID: #{product.id}</li>
            <li>Color Options: {product.Colors?.join(", ") || "Standard"}</li>
          </ul>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-700/40">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-gray-900 dark:text-white">
                  Alex Johnson
                </span>
                <span className="text-[10px] text-gray-400">2 days ago</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Excellent quality! Exactly as described in the pictures and fits
                perfectly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
