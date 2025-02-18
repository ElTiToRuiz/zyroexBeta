import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdShoppingCart } from "react-icons/md";
import { ClientProduct } from "./InventoryClient";
import { useSettings } from "../../../context/settingContext";

interface ShoppingCartProps {
    /** 
     * An array of products in the cart or null/empty if no items.
     * If duplicates of the same product (same ID) exist,
     * we merge them into a single line item in the UI.
     */
    product: ClientProduct[] | null;

    /**
     * Called when the user clicks the backdrop to close the popup 
     * or any other outside area. 
     */
    onClick: () => void;

    /**
     * Optional callback to remove a product entirely from the cart.
     * Could remove the line item or just set quantity to 0.
     */
    onRemove?: (id: string) => void;

    /**
     * Whether the popup is open or not.
     * If you want to control open/close outside, pass in a boolean. 
     * Another approach is to wrap this in an AnimatePresence.
     */
    isOpen?: boolean;
}

/**
 * A local interface representing a 'merged' cart line item, 
 * grouping duplicates by ID and storing a quantity.
 */
interface CartItem {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    imageSrc?: string;
    quantity: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
    product,
    onRemove,
    onClick,
    isOpen = true,
}) => {
    // Merge duplicates into line items with quantity
	const { getCurrencyChange } = useSettings();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const taxRate = 0.21;

    // On initial or subsequent changes to `product`, group duplicates by ID
    useEffect(() => {
        if (!product || product.length === 0) {
            setCartItems([]);
            return;
        }

        // Merge duplicates: 
        // Key by product ID, sum quantities, keep other fields consistent
        const grouped: Record<string, CartItem> = {};

        // We treat each entry as quantity=1 unless "quantity" already stored
        product.forEach((p) => {
            if (!grouped[p.id]) {
                grouped[p.id] = {
                    id: p.id,
                    name: p.name,
                    sku: p.sku,
                    price: p.price,
                    stock: p.stock,
                    imageSrc: p.imageSrc,
                    quantity: 1,
                };
            } else {
                // If already exists, increment quantity
                grouped[p.id].quantity += 1;
            }
        });

        setCartItems(Object.values(grouped));
    }, [product]);

    // Calculate cost details (subtotal, shipping, tax, finalTotal)
    // This recalculates whenever cartItems changes
    const { subtotal, shipping, tax, finalTotal, itemCount } = useMemo(() => {
        if (!cartItems || cartItems.length === 0) {
            return {
                subtotal: 0,
                shipping: 0,
                tax: 0,
                finalTotal: 0,
                itemCount: 0,
            };
        }
        const items = cartItems.reduce(
            (acc, item) => {
                acc.itemCount += item.quantity;
                acc.subtotal += item.price * item.quantity;
                return acc;
            },
            { itemCount: 0, subtotal: 0 }
        );

        // Example shipping is a fixed $5 if any items exist
        const shippingCost = items.itemCount > 0 ? 5 : 0;
        // Example tax at 8% of subtotal
        const taxAmount = items.subtotal * taxRate;
        const total = items.subtotal + shippingCost + taxAmount;

        return {
            itemCount: items.itemCount,
            subtotal: items.subtotal,
            shipping: shippingCost,
            tax: taxAmount,
            finalTotal: total,
        };
    }, [cartItems]);

    /**
     * Handle changing quantity in the UI:
     *  - Prevent going below 1 or above available stock
     *  - Recalculate line items
	*/
    const handleQuantityChange = (id: string, newQty: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== id) return item;
                // Ensure it stays within valid range
                const safeQty = Math.max(1, Math.min(newQty, item.stock));
                return { ...item, quantity: safeQty };
            })
        );
    };


    const handlePay = () => alert("Payment not implemented in this demo.");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClick}  // Clicking backdrop closes
                >
                    {/* Cart Container */}
                    <motion.div
                        className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden cursor-auto"
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 60, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // Prevent close on content click
                    >
                        {/* Header */}
                        <div className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <div className="flex items-center space-x-2">
                                <MdShoppingCart className="text-2xl" />
                                <h2 className="text-xl font-semibold">
                                    Your Shopping Cart
                                </h2>
                            </div>
                            {/* Close Icon */}
                            <button
                                onClick={onClick}
                                className="text-white hover:text-red-200 transition-colors"
                                aria-label="Close cart"
                            >
                                <MdClose className="text-2xl" />
                            </button>
                        </div>

                        {/* Cart Content */}
                        <div className="p-6 space-y-4">
                            {cartItems.length === 0 ? (
                                // Empty Cart
                                <div className="text-center">
                                    <p className="text-gray-500 mb-4">
                                        Your cart is currently empty.
                                    </p>
                                    <img
                                        src="https://via.placeholder.com/150?text=Empty+Cart"
                                        alt="Empty Cart"
                                        className="mx-auto mb-2 w-24 h-24 object-cover opacity-50"
                                    />
                                </div>
                            ) : (
                                // List of Cart Items
                                <>
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                className="flex items-center gap-4 border-b pb-4 last:border-none"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                {/* Product Image */}
                                                {item.imageSrc ? (
                                                    <img
                                                        src={item.imageSrc}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                                                        No Image
                                                    </div>
                                                )}

                                                {/* Product Details */}
                                                <div className="flex-grow">
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        SKU: {item.sku}
                                                    </p>
                                                    {/* Price + Subtotal */}
                                                    <p className="text-sm text-green-600 font-medium mt-1">
                                                        Unit Price: {getCurrencyChange({ number: item.price })}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        In Stock: {item.stock}
                                                    </p>
                                                </div>

                                                {/* Quantity Control */}
                                                <div className="flex flex-col items-center">
                                                    <label
                                                        htmlFor={`qty-${item.id}`}
                                                        className="text-xs text-gray-500"
                                                    >
                                                        Qty
                                                    </label>
                                                    <input
                                                        id={`qty-${item.id}`}
                                                        type="number"
                                                        min={1}
                                                        max={item.stock}
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            handleQuantityChange(
                                                                item.id,
                                                                parseInt(e.target.value, 10)
                                                            )
                                                        }
                                                        className="w-16 text-center border rounded-md px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                    />
                                                    <p className="text-xs mt-1 text-gray-600">
                                                        Subtotal: {getCurrencyChange({number: item.price * item.quantity})}
                                                    </p>
                                                </div>

                                                {/* Remove Button (if provided) */}
                                                {onRemove && (
                                                    <button
                                                        onClick={() => onRemove(item.id)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer: Cart Summary + Payment Button */}
                        {cartItems.length > 0 && (
                            <div className="px-6 py-4 border-t bg-gray-50">
                                <div className="text-sm text-gray-700 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            Items in Cart:
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {itemCount}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            Subtotal:
                                        </span>
                                        <span className="text-green-600 font-semibold">
                                            {getCurrencyChange({ number: subtotal })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            Shipping:
                                        </span>
                                        <span className="text-gray-600">
                                            {getCurrencyChange({ number: shipping })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            Tax ({(taxRate * 100).toFixed(0)}%):
                                        </span>
                                        <span className="text-gray-600">
                                            {getCurrencyChange({ number: tax })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-2 border-t">
                                        <span className="font-bold text-lg">
                                            Total:
                                        </span>
                                        <span className="font-bold text-lg text-indigo-600">
                                            {getCurrencyChange({ number: parseFloat(finalTotal.toFixed(2)) })}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-end gap-2">
                                    <button
                                        onClick={onClick}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                                    >
                                        Continue Shopping
                                    </button>
                                    <button
                                        onClick={handlePay}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
