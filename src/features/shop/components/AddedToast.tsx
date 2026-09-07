import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";

interface AddedToastProps {
  message: string | null;
}

export function AddedToast({ message }: AddedToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-20 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-400/30 text-xs font-semibold"
        >
          <IoCheckmark className="text-lg bg-white/20 rounded-full p-0.5" />
          <span>Added "{message}" to cart!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}