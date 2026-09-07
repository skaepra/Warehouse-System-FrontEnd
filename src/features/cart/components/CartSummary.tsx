interface CartSummaryProps {
  totals: number;
  shippingFee: number;
  allTotal: number;
  onCheckout: () => void;
}

export function CartSummary({ totals, shippingFee, allTotal, onCheckout }: CartSummaryProps) {
  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryRow}>
        <p>Subtotal</p>
        <p>${totals.toFixed(2)}</p>
      </div>

      <div className={styles.summaryRow}>
        <p>Shipping</p>
        <p>${shippingFee.toFixed(2)}</p>
      </div>

      <hr className={styles.summaryDivider} />

      <div className={styles.summaryTotalRow}>
        <p>Total</p>
        <p>${allTotal.toFixed(2)}</p>
      </div>

      <p className={styles.vatNotice}>including VAT</p>

      <button type="button" onClick={onCheckout} className={styles.checkoutBtn}>
        Check out
      </button>
    </div>
  );
}

const styles = {
  summaryCard: "mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 dark:bg-zinc-900 dark:border-zinc-700",
  summaryRow: "mb-2 flex justify-between text-gray-700 dark:text-gray-300",
  summaryDivider: "my-4 border-gray-200 dark:border-zinc-700",
  summaryTotalRow: "flex justify-between text-lg font-bold text-gray-900 dark:text-white",
  vatNotice: "text-sm text-gray-500 float-end mt-1",
  
  checkoutBtn: "mt-6 w-full py-1.5 text-white font-semibold bg-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md shadow-purple-500/20  hover:shadow-purple-500/40 dark:hover:drop-shadow-2xl cursor-pointer block text-center",
};