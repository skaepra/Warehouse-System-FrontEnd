import { CartItem } from "../components/CartItem";
import { EmptyCart } from "../components/EmptyCart";
import { CartSummary } from "../components/CartSummary";
import { useShoppingCart } from "../hook/useShoppingCart";


export default function ShoppingCartScreen() {
  const {
    storitems,
    totals,
    shippingFee,
    allTotal,
    isEmpty,
    handleCheckout,
    getItemKey,
  } = useShoppingCart();

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.cartHeader}>Cart Items</h1>

      <div className={styles.mainLayout}>
        <div className={styles.itemsListContainer}>
          {storitems.map((item) => (
            <CartItem key={getItemKey(item)} {...item} />
          ))}
        </div>

        <CartSummary
          totals={totals}
          shippingFee={shippingFee}
          allTotal={allTotal}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
// فصل التنسيقات خارج المكون
const styles = {
  wrapper: "min-h-screen bg-[#f3f2f2] dark:bg-zinc-800 p-4",
  cartHeader: "mt-12 mb-5 text-center text-2xl font-bold md:ml-8 dark:text-white",
  mainLayout: "mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0",
  itemsListContainer: "rounded-lg md:w-2/3 space-y-4",
};