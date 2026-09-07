import { Link } from "react-router-dom";
import { Product } from "../types/product";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map((relProduct) => (
          <Link
            key={relProduct.id}
            to={`/product/${relProduct.id}`}
            onClick={() => window.scrollTo({ top: 20, behavior: "smooth" })}
            className="group bg-white dark:bg-zinc-800 rounded-2xl p-3 border border-gray-100 dark:border-zinc-700/50 hover:shadow-lg transition-all"
          >
            <div className="aspect-square rounded-xl bg-gray-100 dark:bg-zinc-900 overflow-hidden mb-3">
              <img
                src={relProduct.Images[0]}
                alt={relProduct.Name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white truncate">
              {relProduct.Name}
            </h3>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              ${relProduct.Price}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
