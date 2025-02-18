import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const CookieBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent") || "false";
        if (consent === "false") setShowBanner(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", JSON.stringify(true));
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", JSON.stringify(false));
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    className="fixed bottom-0 left-0 w-full z-50"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="bg-gray-800 text-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        {/* Text Section */}
                        <div className="max-w-3xl">
                            <h3 className="text-lg font-semibold mb-1">
                                We use cookies!
                            </h3>
                            <p className="text-sm text-gray-200">
                                We use cookies to personalize content and analyze our traffic. 
                                By clicking "Accept", you consent to our use of cookies. 
                                You can learn more in our{" "}
                                <a
                                    href="/privacy"
                                    className="underline text-indigo-400 hover:text-indigo-200 transition-colors"
                                >
                                    Privacy Policy
                                </a>.
                            </p>
                        </div>

                        {/* Buttons Section */}
                        <div className="flex items-center gap-2 sm:ml-4">
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 bg-gray-700 text-white text-sm rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
