import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const NotificationPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [animatePopup, setAnimatePopup] = useState(false);

    useEffect(() => {
        // Show popup after 10 seconds
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 5000);

        // Animate popup every 15 seconds if it's still visible
        const bounceTimer = setInterval(() => {
            if (showPopup) {
                setAnimatePopup(true);
                setTimeout(() => setAnimatePopup(false), 1000);
            }
        }, 1500);

        return () => {
            clearTimeout(timer);
            clearInterval(bounceTimer);
        };
    }, [showPopup]);

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    className="fixed bottom-6 right-6 bg-white shadow-lg rounded-lg p-4 w-80 flex items-center gap-4 border border-gray-300"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full"
                        animate={animatePopup ? { scale: 1.1 } : {}}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        🚀
                    </motion.div>

                    <div className="flex-1 cursor-pointer" onClick={() => window.open("https://calendly.com/ruizigor-zyroex/30min", "_blank")}>
                        <p className="text-sm font-medium">Want to see Zyroex in action?</p>
                        <p className="text-xs text-gray-600">Try the demo or book a quick chat!</p>
                    </div>

                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPopup(false)}
                    >
                        ✖
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
