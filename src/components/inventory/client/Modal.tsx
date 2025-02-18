import { AnimatePresence, motion } from "framer-motion";
import { ClientProduct } from "./InventoryClient";
import { useState } from "react";
import { useSettings } from "../../../context/settingContext";


type ModalProp = {
    selectedProduct: ClientProduct;
    setSelectedProduct: (product: ClientProduct | null) => void;
    handleAddCart: (product: ClientProduct) => void;
    handleRemoveCart: (product: ClientProduct) => void;
}

export const CardModal = ({selectedProduct, setSelectedProduct, handleAddCart, handleRemoveCart}:ModalProp) => {

    const { getCurrencyChange } = useSettings(); 
    const [selected, setSelected] = useState<boolean>(selectedProduct.buy);
    


    return  (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                exit={{ backgroundColor: "rgba(0,0,0,0)" }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="bg-white rounded-xl shadow-xl w-11/12 max-w-lg mx-auto p-6 relative"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 60, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Close Button (top-right) */}
                    <button
                        onClick={() => setSelectedProduct(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                        </svg>
                    </button>

                    {/* Product Info */}
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {selectedProduct.name}
                        </h2>
                        {/* Optional SKU display */}
                        <p className="text-sm text-gray-500 mt-1">
                            SKU: {selectedProduct.sku}
                        </p>
                    </div>

                    {selectedProduct.imageSrc && typeof selectedProduct.imageSrc === "string" ? (
                        <img
                        src={selectedProduct.imageSrc}
                        alt={selectedProduct.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                        />
                    ) : (
                        <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md mb-4">
                            No Image
                        </div>
                    )}

                    <div className="text-left">
                        <p className="text-lg text-purple-600 font-bold mb-2">
                            {getCurrencyChange({ number: selectedProduct.price })}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Category:</span>{" "}
                            {selectedProduct.category}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Stock:</span>{" "}
                            {selectedProduct.stock}
                        </p>

                        {/* Rating (simple star representation) */}
                        <div className="flex items-center mt-2">
                            <span className="text-sm font-semibold text-gray-700 mr-2">
                                Rating:
                            </span>
                            {[...Array(5)].map((_, idx) => (
                                <svg
                                key={idx}
                                className={`h-5 w-5 ${
                                    idx < (selectedProduct.rating || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.166 3.592a1 1 0 00.95.69h3.773c.969 0 1.371 1.24.588 1.81l-3.05 2.22a1 1 0 00-.364 1.118l1.165 3.592c.3.92-.755 1.688-1.54 1.118l-3.05-2.22a1 1 0 00-1.176 0l-3.05 2.22c-.785.57-1.84-.197-1.54-1.118l1.165-3.592a1 1 0 00-.364-1.118l-3.05-2.22c-.783-.57-.38-1.81.589-1.81h3.772a1 1 0 00.951-.69l1.165-3.592z" />
                                </svg>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-700 mt-4">
                            {selectedProduct.description}
                        </p>
                    </div>

                {/* Bottom Buttons */}
                <div className="flex justify-end mt-6 gap-2">
                    {
                        selected ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                onClick={() => {
                                    handleRemoveCart(selectedProduct as ClientProduct)
                                    setSelected(false)
                                }}
                            >
                                Remove from Cart
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors mr-2"
                                onClick={()=>{
                                    handleAddCart(selectedProduct as ClientProduct)
                                    setSelected(true)
                                }}
                            >
                                Add to Cart
                            </motion.button>
                        )
                    }
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                        onClick={() => setSelectedProduct(null)}
                    >
                        Close
                    </motion.button>
                </div>
                </motion.div>
            </motion.div>
        
        </AnimatePresence>
    )
}