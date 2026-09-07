import { NavLink } from "react-router-dom";

export default function Footer() { 
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.container}>
        {/* Top Grid Section */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className="space-y-3">
            <h2 className={styles.brandTitle}>
              Store<span className="text-indigo-500">.</span>
            </h2>
            <p className={styles.brandDesc}>
              Your one-stop shop for premium physical products delivered right to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li><NavLink to="/" className={styles.link}>Home</NavLink></li>
              <li><NavLink to="/shop" className={styles.link}>Shop All</NavLink></li>
              <li><NavLink to="/cart" className={styles.link}>Shopping Cart</NavLink></li>           
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className={styles.sectionTitle}>Customer Care</h3>
            <ul className={styles.linkList}>
              <li><NavLink to="/faq" className={styles.link}>FAQ & Help</NavLink></li>
              <li><NavLink to="/shipping" className={styles.link}>Shipping Info</NavLink></li>
              <li><NavLink to="/returns" className={styles.link}>Returns & Refunds</NavLink></li>
              <li><NavLink to="/contact" className={styles.link}>Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className={styles.sectionTitle}>Newsletter</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Subscribe to get special offers and daily updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <button className={styles.subscribeBtn}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Store. All rights reserved.
          </p>

          {/* Payment Badges / Text */}
          <div className={styles.payments}>
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Fast Shipping</span>
            <span>•</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// التنسيقات المطابقة لصفحات السلة والـ Checkout
const styles = {
  footerWrapper: "bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 transition-colors duration-200 mt-auto",
  container: "mx-auto  px-6 py-10 xl:px-0 ",
  grid: "grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 max-w-5xl mx-auto",
  
  brandTitle: "text-2xl font-bold tracking-tight text-gray-900 dark:text-white",
  brandDesc: "text-sm text-gray-600 dark:text-gray-400 leading-relaxed",
  
  sectionTitle: "text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-3",
  linkList: "space-y-2 text-sm",
  link: "hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-150",
  
  newsletterInput: "w-full border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 dark:bg-zinc-800 dark:text-white",
  subscribeBtn: "py-1.5 px-4 text-sm font-semibold text-white bg-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg cursor-pointer shrink-0 shadow-md shadow-purple-500/20  hover:shadow-purple-500/40",
  
  divider: "my-6 border-gray-200 dark:border-zinc-800",
  bottomSection: "flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4 mb-[-20px] mx-auto max-w-6xl",
  copyright: "text-center sm:text-left",
  payments: "flex gap-2 items-center text-gray-400 dark:text-gray-500 font-medium",
};