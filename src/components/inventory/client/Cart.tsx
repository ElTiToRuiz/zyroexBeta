import { motion, AnimatePresence } from "framer-motion";

// Example props interface
interface CartProps {
  itemCount: number;
  onClick: () => void;
}

export const Cart = ({ itemCount, onClick }: CartProps) => {
    return (
        <div className="fixed bottom-4 right-4 z-50" onClick={onClick}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center bg-white text-gray-700 shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
            >
                {/* Cart Icon (using a simple SVG, but you can replace with your own) */}
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 8.5a.5.5 0 00.5.5h12a.5.5 0 00.5-.5L17 13H7zm10 0V5a2 2 0 10-4 0v8"
                />
                </svg>

                {/* Badge (only show if itemCount > 0) */}
                <AnimatePresence>
                    {itemCount > 0 && (
                        <motion.span
                        key="cart-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold"
                        >
                        {itemCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
