import  { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Cart } from "./Cart";
import { CardModal } from "./Modal";
import { ShoppingCart } from "./ShoppingCart";
import { useInventory } from "../../../context/InventoryContext";
import { useSettings } from "../../../context/settingContext";

export type ClientProduct = {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    threshold: number;
    imageSrc?: string;
    category?: string;
    description?: string;
    rating?: number;
    buy: boolean;
};

export const InventoryClientView = () => {
    // Get the products from inventory
    const { inventory } = useInventory();
    const { getCurrencyChange } = useSettings(); 

    // Local state for search, selected product modal, cart and shopping cart visibility
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<ClientProduct | null>(null);
    const [cart, setCart] = useState<ClientProduct[]>([]);
    const [showShopping, setShowShopping] = useState<boolean>(false);

    // Filter products based on the search term (searching in name and category)
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return inventory as ClientProduct[];
        return inventory.filter((product) => {
            const term = searchTerm.toLowerCase();
            return (
                product.name.toLowerCase().includes(term) ||
                (product.category && product.category.toLowerCase().includes(term))
            );
        }) as ClientProduct[];
    }, [inventory, searchTerm]);

    // Add product to the cart
    const handleAddCart = (product: ClientProduct) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Remove product from the cart by its ID
    const handleRemoveCart = (product: ClientProduct) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    };

    // Count of items in the cart (could also sum quantities if you have that logic)
    const cartCount = cart.length;

    // For the shopping cart view, we use the products in the cart
    const productsToBuy = cart;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* -- Hero Section -- */}
            <section className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto px-6 py-12"
                >
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                        Zyroex Store
                    </h1>
                    <p className="text-base md:text-xl font-light">
                        Where Future Meets Convenience
                    </p>

                    {/* Search Bar in Hero */}
                    <div className="mt-8 w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            <input
                                type="text"
                                placeholder="Search for a product..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 px-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* -- Product Listing -- */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-10">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800"
                >
                    Explore Our Products
                </motion.h2>

                {/* Products Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                // Staggered animation effect for each card
                                whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
                                layout
                                className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all flex flex-col"
                                onClick={() => setSelectedProduct(product)}
                            >
                                {/* Card Image */}
                                {product.imageSrc && typeof product.imageSrc === "string" ? (
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-full h-44 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}

                                {/* Card Content */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-indigo-500 font-medium">
                                        Category: {product.category || "N/A"}
                                    </p>
                                    <p className="mt-auto mb-2 font-bold text-xl text-purple-600">
                                        {getCurrencyChange({ number: product.price })}
                                    </p>
                                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between mt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProduct(product);
                                            }}
                                        >
                                            View Details
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">
                            No products available...
                        </p>
                    )}
                </motion.div>
            </main>

            {/* Modal for product details */}
            {selectedProduct && (
                <CardModal
                    selectedProduct={selectedProduct}
                    setSelectedProduct={() => setSelectedProduct(null)}
                    handleAddCart={handleAddCart}
                    handleRemoveCart={handleRemoveCart}
                />
            )}

            {/* Cart Icon */}
            <Cart itemCount={cartCount} onClick={() => setShowShopping(true)} />

            {/* -- Footer -- */}
            <footer className="bg-gray-900 text-gray-300 py-6 mt-8">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Zyroex Store. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Shopping Cart Modal */}
            {showShopping && (
                <ShoppingCart
                    product={productsToBuy}
                    onClick={() => setShowShopping(false)}
                />
            )}
        </div>
    );
};
