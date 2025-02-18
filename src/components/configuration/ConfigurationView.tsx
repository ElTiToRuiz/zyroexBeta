import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationPreferences } from "./NotificationPreferences";
import { SystemSettings } from "./SystemSetting";
import { RoleManagement } from "./RoleManagement";
import { AppearanceSettings } from "./AppearanceSettings";
import { ThirdPartyConnection } from "./ThirdPartyConnection";

import { useAuthUser } from "../../context/authContext";

export const ConfigurationPage = () => {
    const { hasSuperAdminRole } = useAuthUser();

    // Manage the active tab
    const [activeTab, setActiveTab] = useState<string>("notifications");

    // Define your tabs, conditionally including admin-only tabs
    const adminTabs = [
        { key: "notifications", label: "Notifications", available: true},
        { key: "systemPreferences", label: "System Preferences", available: true},
        { key: "roleManagement", label: "Role Management", available: true},
        { key: "appearance", label: "Appearance", available: false},
        { key: "systemIntegrations", label: "System Integrations", available: false},
    ];

    const userTabs = [
        { key: "notifications", label: "Notifications", available: true},
        { key: "systemPreferences", label: "System Preferences", available: true}, 
        { key: "appearance", label: "Appearance", available: true}
    ];

    const tabs = hasSuperAdminRole() ? adminTabs : userTabs;
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page container */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-4xl sm:text-5xl flex items-center font-bold pb-10 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 mr-2">
                    <span role="img" aria-label="gear" className="mr-3">
                        ⚙️
                    </span>
                    Settings
                </h1>


                <div className="flex overflow-x-auto border-b border-gray-200 space-x-2">
                    {tabs.map((tab) =>
                        tab.available ? (
                        /* -- Available Tab -- */
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative py-2 px-4 text-sm font-semibold 
                            focus:outline-none transition-colors duration-200 
                            rounded-t-md 
                            ${
                                activeTab === tab.key
                                ? "bg-white text-indigo-600 border-b-2 border-indigo-500"
                                : "text-gray-600 hover:text-indigo-500"
                            }`}
                        >
                            {tab.label}
                        </button>
                        ) : (

                        /* -- "Not Available" Tab -- */
                        <div key={tab.key} className="relative group">
                            <button
                                disabled
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative py-2 px-4 text-sm font-semibold 
                                    cursor-not-allowed focus:outline-none transition-colors duration-200 
                                    rounded-t-md text-gray-400 
                                    ${
                                    activeTab === tab.key
                                        ? "bg-white border-b-2 border-gray-300"
                                        : "bg-transparent"
                                    }`}
                                >
                                {tab.label}
                                {/* A small "lock" or "slash" icon can be added here if desired */}
                            </button>
                            {/* Tooltip that appears on hover */}
                            <div
                                className="absolute left-1/2 bottom-full mb-2 
                                hidden group-hover:block 
                                -translate-x-1/2 px-2 py-1 
                                text-xs text-white bg-black rounded shadow-md"
                            >
                                Not Available in Demo
                            </div>
                        </div>
                        )
                    )}
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-b-md shadow p-6 mt-2">
                    <AnimatePresence mode="wait">
                        {activeTab === "notifications" && (
                        <motion.div
                            key="notifications"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <NotificationPreferences />
                        </motion.div>
                        )}

                        {activeTab === "systemPreferences" && (
                        <motion.div
                            key="systemPreferences"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <SystemSettings />
                        </motion.div>
                        )}

                        {activeTab === "roleManagement" && hasSuperAdminRole() && (
                        <motion.div
                            key="roleManagement"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <RoleManagement />
                        </motion.div>
                        )}

                        {activeTab === "appearance" && (
                        <motion.div
                            key="appearance"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <AppearanceSettings />
                        </motion.div>
                        )}

                        {activeTab === "systemIntegrations" &&
                        hasSuperAdminRole() && (
                            <motion.div
                            key="systemIntegrations"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            >
                                <ThirdPartyConnection />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
