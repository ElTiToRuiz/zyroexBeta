import { useState } from "react";
import { useInventory } from "../../../context/InventoryContext";
import { Product } from "../../../utils/types";
import { motion } from 'framer-motion';


export const InventoryClientView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { inventory } = useInventory();

    const busineesName = "My Business";
    // const businessSlogan = "The best products in town!";

    const filteredProducts = inventory.filter(
        (product) =>
            product.stock > 0 &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 pb-10 group">
            {/* Brand Header */}
            <header className="w-full flex flex-col items-center py-6 bg-green-700  text-white shadow-md">
                <div className="max-w-6xl w-full flex items-center justify-between px-6">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-wide">{busineesName}</h1>
                        {/* <p className="text-lg font-light">{businessSlogan}</p> */}
                    </div>
                </div>
            </header>

            <div className="max-w-6xl w-full p-6 bg-white shadow-lg rounded-xl mt-6 sm:mx-4">
                {/* Search Bar */}
                <div className="flex flex-start mb-6">
                    <input
                        type="text"
                        placeholder="Search for a product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Product List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ scale: 1.05 }}
                                className="border rounded-xl p-4 shadow-md bg-white cursor-pointer hover:shadow-xl transition-all"
                                onClick={() => setSelectedProduct(product)}
                            >
                                {product.imageSrc && typeof product.imageSrc === "string" ? (
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-full h-44 object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                                        No Image
                                    </div>
                                )}
                                <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
                                <p className="text-green-600 font-bold text-lg">${product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                                    onClick={() => alert("Add to cart clicked")}
                                >
                                    Add to Cart
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No products available...</p>
                    )}
                </div>
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center w-full h-full z-50">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-11/12 text-center"
                    >
                        <h2 className="text-2xl font-bold mb-3">{selectedProduct.name}</h2>
                        {selectedProduct.imageSrc && typeof selectedProduct.imageSrc === "string" ? (
                            <img
                                src={selectedProduct.imageSrc}
                                alt={selectedProduct.name}
                                className="w-full h-44 object-cover rounded-md mb-4"
                            />
                        ) : (
                            <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                                No Image
                            </div>
                        )}
                        <div className="mt-4">
                            <p className="text-green-600 font-bold text-lg">${selectedProduct.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Description:</p>
                            <p className="text-sm text-gray-500">Stock: {selectedProduct.stock}</p>
                        </div>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
