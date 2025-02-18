import { notifications } from "../../utils/data/notificationData";
import { parseDateToLocal } from "../authentication/ProfileContainer";
import { motion, AnimatePresence } from "framer-motion";

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "low":
            return "bg-green-100 text-green-800";
        case "medium":
            return "bg-yellow-100 text-yellow-800";
        case "high":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const NotificationContainer2 = () => {
    // Variants for the container and cards
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header */}
            <header className="mb-8 text-center">
                <motion.h1
                    className="text-4xl font-extrabold flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span role="img" aria-label="bell" className="mr-2">
                        🔔
                    </span>
                    Notification Center
                </motion.h1>
                <motion.h2
                    className="text-xl mt-2 text-gray-700 flex items-center justify-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span role="img" aria-label="inbox" className="mr-2">
                        📥
                    </span>
                    Inbox
                </motion.h2>
            </header>

            {/* Notifications List */}
            <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {notifications.map((notification, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className={`p-5 rounded-xl shadow-lg border 
                                ${notification.isRead ? "bg-gray-100 opacity-60" : "bg-white"} 
                                cursor-pointer hover:shadow-2xl transition`}
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {notification.title}
                                    </h3>
                                    <p className="mt-1 text-gray-600 text-sm">
                                        {notification.message}
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 flex flex-col items-end">
                                    <span className="text-sm text-gray-700">
                                        {notification.type}
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        {parseDateToLocal(notification.createdAt)}
                                    </span>
                                    {notification.priority && (
                                        <span
                                            className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}
                                        >
                                            {capitalize(notification.priority)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
