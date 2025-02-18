import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "../../context/settingContext";

export const NotificationPreferences = () => {
    const { settings, isInitialized, updateNotificationSetting } = useSettings();

    // Early return if context data isn't available yet
    if (!settings) return null;

    // While context is initializing, display a loading spinner
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
                <span className="ml-3 text-gray-600">Loading Preferences...</span>
            </div>
        );
    }

    // Local state mirrors the notification toggles from settings
    const [orders, setOrders] = useState<boolean>(settings.notification.orderNotificationEnabled);
    const [inventory, setInventory] = useState<boolean>(settings.notification.inventoryNotificationEnabled);
    const [announcements, setAnnouncements] = useState<boolean>(settings.notification.generalNotificationEnabled);

    // Sync local state with context any time settings change
    useEffect(() => {
        setOrders(settings.notification.orderNotificationEnabled);
        setInventory(settings.notification.inventoryNotificationEnabled);
        setAnnouncements(settings.notification.generalNotificationEnabled);
    }, [settings]);

  // Handle checkbox toggle logic
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const newSettings = {
            orderNotificationEnabled: name === "orders" ? checked : orders,
            inventoryNotificationEnabled: name === "inventory" ? checked : inventory,
            generalNotificationEnabled: name === "announcements" ? checked : announcements,
        };

        // Update local state
        if (name === "orders") setOrders(checked);
        if (name === "inventory") setInventory(checked);
        if (name === "announcements") setAnnouncements(checked);

        // Persist updates to context
        updateNotificationSetting(newSettings);
    };

    return (
        <motion.div
        // Fade-in animation
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-md"
        >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight mb-6">
            Notification Preferences
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
            Customize which notifications you want to receive. Toggle them on or off
            at any time. Changes are automatically saved.
        </p>

        {/* Notification Toggles */}
        <div className="space-y-6">
            {/* Orders */}
            <div className="flex items-start space-x-4">
            <input
                name="orders"
                type="checkbox"
                id="orders"
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                checked={orders}
            />
            <div>
                <label
                htmlFor="orders"
                className="text-lg text-gray-800 font-medium cursor-pointer"
                >
                Order Notifications
                </label>
                <p className="text-sm text-gray-500">
                Receive an alert whenever a new order is placed or updated.
                </p>
            </div>
            </div>

            {/* Inventory */}
            <div className="flex items-start space-x-4">
            <input
                name="inventory"
                type="checkbox"
                id="inventory"
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                checked={inventory}
            />
            <div>
                <label
                htmlFor="inventory"
                className="text-lg text-gray-800 font-medium cursor-pointer"
                >
                Inventory Updates
                </label>
                <p className="text-sm text-gray-500">
                Be notified about low stock, restocks, or critical inventory
                changes.
                </p>
            </div>
            </div>

            {/* Announcements */}
            <div className="flex items-start space-x-4">
            <input
                name="announcements"
                type="checkbox"
                id="announcements"
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                checked={announcements}
            />
            <div>
                <label
                htmlFor="announcements"
                className="text-lg text-gray-800 font-medium cursor-pointer"
                >
                General Announcements
                </label>
                <p className="text-sm text-gray-500">
                Stay updated on general news, promotions, or policy changes.
                </p>
            </div>
            </div>
        </div>
        </motion.div>
    );
};
