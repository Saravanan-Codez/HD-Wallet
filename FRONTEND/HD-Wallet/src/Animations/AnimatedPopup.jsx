import { motion, AnimatePresence } from "framer-motion";
motion
export default function AnimatedPopup({ children, isOpen }) {
  return (
    <AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      key="popup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="bg-zinc-900 rounded-xl p-6"
      >
        {children}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
}