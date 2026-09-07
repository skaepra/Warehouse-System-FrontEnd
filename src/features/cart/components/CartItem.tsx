import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { CartItemProps, useCartItem } from "../hook/useCartItem";


export function CartItem(props: CartItemProps) {
  const { name, price, quantity, color, size, image } = props;
  const { total, handleIncrease, handleDecrease, handleRemove } = useCartItem(props);

  return (
    <div className={styles.card}>
      {/* صورة المنتج */}
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.productImg} />
      </div>

      {/* تفاصيل المنتج */}
      <div className={styles.contentWrapper}>
        <div className={styles.detailsBox}>
          <div>
            <h3 className={styles.title}>{name}</h3>
            <div className={`${styles.colorBadge} ${!color ? "invisible" : ""}`}>
              <span className={styles.colorLabel}>Color:</span>
              <span className={styles.colorValue}>{color || "Default"}</span>
              {size && (
                <>
                  <span className="mx-1 text-gray-300 dark:text-gray-600">|</span>
                  <span className={styles.colorLabel}>Size:</span>
                  <span className={styles.colorValue}>{size}</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.priceTag}>${price.toFixed(2)}</div>
        </div>

        {/* الأزرار والإنقاص والإجمالي */}
        <div className={styles.actionsWrapper}>
          <div className={styles.quantityContainer}>
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className={styles.quantityBtn}
              aria-label="Decrease quantity"
            >
              <IoRemove className="text-xs" />
            </button>

            <span className={styles.quantityCount}>{quantity}</span>

            <button
              type="button"
              onClick={handleIncrease}
              className={styles.quantityBtn}
              aria-label="Increase quantity"
            >
              <IoAdd className="text-xs" />
            </button>
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalWrapper}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalText}>${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className={styles.removeBtn}
              title="Remove product"
            >
              <IoTrashOutline className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. كلاسات Tailwind المُحسّنة بالكامل
const styles = {
  card: "group relative flex flex-col sm:flex-row dark:bg-zinc-900 items-center gap-4 mb-4 rounded-2xl bg-white p-4 border border-gray-100 dark:border-zinc-700/60 shadow-sm hover:shadow-md transition-all duration-200",

  imageContainer:
    "relative w-full sm:w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700/40",
  productImg:
    "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300",

  contentWrapper: "flex flex-col justify-between w-full h-full gap-3",

  detailsBox: "flex items-start justify-between gap-2",
  title: "text-sm font-bold text-gray-900 dark:text-white line-clamp-1",

  colorBadge:
    "inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-700/50 text-[11px] font-medium text-gray-600 dark:text-gray-300",
  colorLabel: "text-gray-400 dark:text-gray-400",
  colorValue: "capitalize font-semibold text-gray-700 dark:text-gray-200",

  priceTag: "text-xs font-semibold text-gray-500 dark:text-gray-400",

  actionsWrapper:
    "flex items-center justify-between pt-2 border-t border-gray-100 dark:border-zinc-700/40 mt-auto",

  quantityContainer:
    "flex items-center gap-1 bg-gray-100 dark:bg-zinc-900/60 p-1 rounded-xl border border-gray-200/60 dark:border-zinc-700/50",
  quantityBtn:
    "w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors duration-150 select-none disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 dark:disabled:hover:bg-zinc-800",
  quantityCount:
    "w-8 text-center text-xs font-bold text-gray-900 dark:text-white select-none",

  totalSection: "flex items-center gap-4",
  totalWrapper: "flex flex-col items-end",
  totalLabel: "text-[10px] text-gray-400 uppercase font-medium tracking-wider",
  totalText: "text-sm font-extrabold text-indigo-600 dark:text-indigo-400",

  removeBtn:
    "p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors duration-150",
};