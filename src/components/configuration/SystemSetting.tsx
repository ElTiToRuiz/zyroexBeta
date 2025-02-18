import { useEffect, useState } from "react";
import { useSettings } from "../../context/settingContext";
import { useAuthUser } from "../../context/authContext";
import { motion } from "framer-motion";

export const SystemSettings = () => {
  const { hasSuperAdminRole } = useAuthUser();
  const { settings, isInitialized, updateSystemSetting } = useSettings();

  // Early returns if settings or initialization state isn't ready
    if (!settings) return null;
    if (!isInitialized) {
        return (
            <div className="flex items-center justify-center py-10">
                <svg
                className="animate-spin h-8 w-8 text-indigo-600"
                viewBox="0 0 24 24"
                >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                />
                </svg>
                <span className="ml-3 text-gray-600">Loading Settings...</span>
            </div>
        );
    }

    // Local state for system settings
    const [language, setLanguage] = useState<string>(settings.system.language);
    const [currency, setCurrency] = useState<string>(settings.system.currency);

    // Sync local state when settings context changes
    useEffect(() => {
        setLanguage(settings.system.language);
        setCurrency(settings.system.currency);
    }, [settings]);

    // Handle changes to both the language & currency
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newSettings = {
        language: name === "language" ? value : language,
        currency: name === "currency" ? value : currency,
        };

        // Update local state
        if (name === "language") setLanguage(value);
        if (name === "currency") setCurrency(value);

        // Persist the new settings to context/store
        updateSystemSetting(newSettings);
    };  

    return (
        <motion.div
        // Fade-in & slight slide up
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto p-6 bg-white rounded-md space-y-8"
        >
        {/* Title */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
                System Settings
                </h2>
                <p className="text-gray-600">
                Configure language and currency preferences for your account.
                </p>
            </div>

            {/* Language Settings */}
            <div>
                <label
                htmlFor="language"
                className="block text-lg font-medium text-gray-700 mb-2"
                >
                Language
                </label>

                <div className="relative group">
                <select
                    id="language"
                    name="language"
                    onChange={onChange}
                    value={language}
                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm 
                            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                            hover:border-indigo-300 transition duration-200 ease-in-out"
                >
                    <option value="en">English</option>
                    {/* Demonstration of “Coming Soon” languages */}
                    <option value="es" disabled>
                    Spanish (Coming Soon)
                    </option>
                    <option value="fr" disabled>
                    French (Coming Soon)
                    </option>
                </select>

                {/* Tooltip for "Coming Soon" languages — appears on hover */}
                {(language === "es" || language === "fr") && (
                    <div
                    className="absolute w-max bg-black text-white text-xs rounded-md py-1 px-2 
                                bottom-full left-0 transform -translate-y-2 hidden
                                group-hover:block"
                    >
                    This language is not available yet
                    </div>
                )}
                </div>
            </div>

            {/* Currency Settings — visible to Super Admins only */}
            {hasSuperAdminRole() && (
                <motion.div
                // Animate each settings group
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                >
                <label
                    htmlFor="currency"
                    className="block text-lg font-medium text-gray-700 mb-2"
                >
                    Currency
                </label>
                <p className="text-sm text-gray-500 mb-2">
                    Super Admin exclusive setting
                </p>
                <select
                    id="currency"
                    name="currency"
                    onChange={onChange}
                    value={currency}
                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm 
                            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                            hover:border-indigo-300 transition duration-200 ease-in-out"
                >
                    <option value="usd">United States Dollar (USD)</option>
                    <option value="eur">Euro (EUR)</option>
                    <option value="gbp">British Pound (GBP)</option>
                </select>
                </motion.div>
            )}
            {/* If not super admin, you might show a note or hide the currency field entirely */}
            {!hasSuperAdminRole() && (
                <div className="p-4 text-sm text-gray-500 bg-gray-100 rounded-md">
                <strong>Note:</strong> Currency selection is available for super
                administrators only.
                </div>
            )}
        </motion.div>
    );
};
