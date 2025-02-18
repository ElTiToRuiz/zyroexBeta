import React from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '../../context/orderContext';

export const OrderFilters = () => {
    const { urgent, setStatus, setUrgent } = useOrders();

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const handleUrgentToggle = () => {
        setUrgent(!urgent);
    };

    // Container animation with staggered children
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, duration: 0.5 },
        },
    };

    // Each filter item animates in from the left
    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
                {/* Status Filter */}
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                    <label htmlFor="status" className="text-lg font-semibold text-gray-800">
                        Filter by Status:
                    </label>
                    <select
                        id="status"
                        onChange={handleStatusChange}
                        aria-label="Filter orders by status"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        <option value="All">All</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </motion.div>

                {/* Urgent Toggle */}
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                    <label htmlFor="urgent-toggle" className="text-lg font-semibold text-gray-800">
                        Show Urgent Orders:
                    </label>
                    <div className="relative">
                        <input
                            id="urgent-toggle"
                            type="checkbox"
                            className="sr-only"
                            checked={urgent}
                            onChange={handleUrgentToggle}
                            aria-label="Toggle urgent orders"
                        />
                        <motion.div
                            className={`w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                                urgent ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                            onClick={handleUrgentToggle}
                            whileTap={{ scale: 0.9 }}
                        >
                        <motion.div
                            className="w-6 h-6 bg-white rounded-full shadow-md"
                            animate={{ x: urgent ? 28 : 2 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
