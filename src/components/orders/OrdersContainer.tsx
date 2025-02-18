import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrders } from "../../context/orderContext";
import { OrderCard } from "./OrderCard";
import { OrderFilters } from "./OrderFilter";
import { FiDatabase, FiShoppingCart, FiTable } from "react-icons/fi";
import { OrderTable } from "./OrderTable";

export const Orders = () => {
    // Inicializa la vista a partir del localStorage o, en su defecto, 'list'
    const [view, setView] = useState<string>(
        () => localStorage.getItem("ordersView") || "list"
    );

    const { filteredOrders, filteredByStatus } = useOrders();

    const handleOrdersViewType = (type: string) => {
        localStorage.setItem("ordersView", type);
        setView(type);
    };

    // Variantes para la animación de transición entre vistas
    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <div className="container mx-auto p-6 h-full">
        {/* Encabezado con título y botones de toggle para la vista */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center border-b-2 border-opacity-40 border-gray-100 pb-4">
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3" >
                <FiShoppingCart className="text-green-600" />
                Orders
            </h1>

            <div className="flex space-x-4 mt-5">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOrdersViewType("list")}
                    className={`flex items-center px-4 py-2 rounded transition-colors shadow 
                    ${view === "list" ? "bg-gray-200 text-gray-900" : "bg-white text-gray-700"}`}
                >
                    <FiDatabase className="mr-2" />
                    List
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOrdersViewType("table")}
                    className={`flex items-center px-4 py-2 rounded transition-colors shadow 
                    ${view === "table" ? "bg-gray-200 text-gray-900" : "bg-white text-gray-700"}`}
                >
                    <FiTable className="mr-2" />
                    Table
                </motion.button>
            </div>
        </div>

        {/* Contenido principal: se alterna entre vista de tabla y lista con animación */}
        <AnimatePresence mode="wait">
            {view === "table" ? (
                <motion.div
                    key="table-view"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    {filteredByStatus ? (
                        <OrderTable />
                        ) : (
                        <p className="text-center text-gray-600">No orders available.</p>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    key="list-view"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    <OrderFilters />
                    {/* Grid de OrderCards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} type="list" />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
};
