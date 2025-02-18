import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInventory } from "../../context/InventoryContext";

export const InventoryItemAdd = () => {
    const { addInventoryItem } = useInventory();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [itemName, setItemName] = useState("");
    const [sku, setSku] = useState("");
    const [price, setPrice] = useState("0");
    const [stock, setStock] = useState(0);
    const [threshold, setThreshold] = useState(0);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const clean = () => {
        setImage(null);
        setItemName("");
        setPrice("0");
        setSku("");
        setStock(0);
        setThreshold(0);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            addInventoryItem(itemName, sku, parseFloat(price), stock, threshold);
            clean();
            setIsModalOpen(false);
        } catch (error) {
            alert("Price must be a number");
            return;
        }
    };

    // Backdrop variants for the full-screen modal overlay
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    // Modal card variants for slide-down animation
    const modalVariants = {
        hidden: { y: "-100vh", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        },
        exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <div>
            {/* Trigger Button */}
            {!isModalOpen && (
                <div className="flex justify-center items-center relative">
					<button
						onClick={handleOpenModal}
						className="absolute top-10 flex justify-center items-center w-32 h-32 bg-gradient-to-br from-purple-300 to-indigo-300 rounded-full shadow-2xl text-white text-8xl hover:shadow-3xl transition-transform duration-300 transform hover:scale-105"
					>
						+
					</button>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-white">
                                        Add New Inventory Item
                                    </h2>
                                    <button
                                        onClick={handleCloseModal}
                                        className="text-white text-2xl font-bold hover:text-gray-200"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body: Split Layout */}
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Panel: Image Preview / Placeholder */}
                                <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-lg p-4">
                                    {image ? (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Selected"
                                            className="object-cover w-full h-64 rounded-md"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <svg
                                                className="w-16 h-16 mb-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16V4m0 0l-2 2m2-2l2 2M17 16v-6m0 0l2 2m-2-2l-2 2"
                                                />
                                            </svg>
                                            <p className="text-sm">No image selected</p>
                                            <input
                                                type="file"
                                                id="image"
                                                onChange={handleImageChange}
                                                className="mt-4 text-sm"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Right Panel: Form Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="itemName"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Item Name
                                        </label>
                                        <input
                                            type="text"
                                            id="itemName"
                                            value={itemName}
                                            onChange={(e) => setItemName(e.target.value)}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
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
                                            value={sku}
                                            onChange={(e) => setSku(e.target.value)}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(e.target.value.replace(",", "."))
                                            }
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="stock"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            id="stock"
                                            value={stock}
                                            onChange={(e) => setStock(Number(e.target.value))}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="threshold"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Threshold
                                        </label>
                                        <input
                                            type="number"
                                            id="threshold"
                                            value={threshold}
                                            onChange={(e) =>
                                                setThreshold(Number(e.target.value))
                                            }
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 bg-gray-100 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                                >
                                    Add Item
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
