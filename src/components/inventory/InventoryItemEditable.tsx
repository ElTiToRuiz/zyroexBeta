import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import { useAuthUser } from "../../context/authContext";
import { Product } from "../../utils/types";
import { motion, AnimatePresence } from "framer-motion";

export const EditableForm = ({
    product,
    onClose,
}: {
    product: Product;
    onClose: () => void;
}) => {
    const { onSaveChanges, onDelete } = useInventory();
    const { hasSuperAdminRole, hasAdminRole } = useAuthUser();

    const [imageError, setImageError] = useState(false);
    const [newName, setNewName] = useState(product.name);
    const [newSku, setNewSku] = useState(product.sku);
    const [newPrice, setNewPrice] = useState(product.price);
    const [newStock, setNewStock] = useState(product.stock);
    const [newThreshold, setNewThreshold] = useState(product.threshold);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newStock < 0 || newThreshold < 0) {
            setError("Stock and threshold must be non-negative numbers.");
            return;
        }
        onSaveChanges(newName, newSku, newPrice, newStock, newThreshold);
        onClose();
    };

    const handleDelete = () => {
        onDelete(product.sku);
        onClose();
    };

    // Backdrop animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    // Modal card animation variants
    const modalVariants = {
        hidden: { scale: 0.8, opacity: 0, y: 50 },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 150, damping: 20 },
        },
        exit: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.3 } },
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl text-white font-bold">
                                Edit Product
                            </h2>
                            
                            <button
                                onClick={onClose}
                                className="text-white text-2xl hover:text-gray-200"
                            >
                                &times;
                            </button>
                        </div>
                    </div>

                    {/* Modal Body: Split Layout */}
                    <div className="pt-0 p-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:pt-6">
                        {/* Left Panel: Product Summary */}
                        <div className="relative flex flex-col items-center justify-center border-r border-gray-200 pr-4">
                            <div className="w-32 h-32 md:w-64 md:h-64 bg-gray-100 rounded-full flex items-center justify-center mt-12 md:mt-0 mb-4">
                                {!imageError && product.imageSrc ? (
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-32 h-32 md:w-64 md:h-64 rounded-full"
                                        onError={() => setImageError(true)} // Hide image if it fails to load
                                        loading="lazy"
                                    />
                                ) : (
                                    <span className="text-6xl text-gray-400">
                                        {product.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold text-gray-800">
                                    {product.name}
                                </p>
                                <p className="text-md text-gray-600">#{product.id}</p>
                                <p className="text-md text-gray-600">{product.sku}</p>
                            </div>
                            {newStock < newThreshold && (
                                <motion.div
                                    className="absolute top-3 bg-red-100 px-2 py-1 rounded-full"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <span className="text-red-600 text-xs font-semibold">
                                        Stock is low. Please restock.
                                    </span>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Panel: Editable Form */}
                        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
                            {hasAdminRole() && (
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                            {hasSuperAdminRole() && (
                                <div>
                                    <label
                                        htmlFor="sku"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        SKU
                                    </label>
                                    <input
                                        type="text"
                                        id="sku"
                                        value={newSku}
                                        onChange={(e) => setNewSku(e.target.value)}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                            {hasAdminRole() && (
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(Number(e.target.value))}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                            <div>
                                <label
                                    htmlFor="stock"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    value={newStock}
                                    onChange={(e) => setNewStock(Number(e.target.value))}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="threshold"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Low Stock Threshold
                                </label>
                                <input
                                    type="number"
                                    id="threshold"
                                    value={newThreshold}
                                    onChange={(e) => setNewThreshold(Number(e.target.value))}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm">
                                    {error}
                                </div>
                            )}
                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4 mt-4">
                                {hasSuperAdminRole() && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                )}
                                {/* <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button> */}
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
