export function EmptyCart() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.emptyContainer}>
        <div className={styles.emptyContent}>
          <svg
            className={styles.emptyIcon}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth={2}
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
          <h1 className={styles.emptyText}>No items in the cart</h1>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: "min-h-screen bg-[#f3f2f2] dark:bg-zinc-800 p-4",
  emptyContainer: "flex justify-center p-14",
  emptyContent: "lg:ml-8 text-center flex flex-col items-center",
  emptyIcon: "w-[300px] h-[300px] text-zinc-800 mt-14 dark:text-zinc-700",
  emptyText: "text-2xl text-zinc-700 dark:text-zinc-600 mt-4",
};