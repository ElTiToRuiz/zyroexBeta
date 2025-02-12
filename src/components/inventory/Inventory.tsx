import { InventoryList } from "./InventoryList";
import { StockAlert } from "./StockAlert";
import { useInventory } from "../../context/InventoryContext";
import { InventoryFilters } from "./filters/InventroyFilters";
import { FaBoxOpen, FaEye } from "react-icons/fa";

export const Inventory = () => {
    const { outOfStockItems, lowStockItems } = useInventory();

    const addNewProduct = () => document.getElementById("addInventoryItem")?.click();
    const restockInventory = () => {
        const itemToRestock = outOfStockItems[0] || lowStockItems[0] || null;
        if (itemToRestock) {
            document.getElementById(`i-${itemToRestock.id}`)?.click();
        } else {
            alert("No items to restock");
        }
    }

    const quickActions = [
        { label: "➕ Add New Product", onclick: () => addNewProduct()},
        { label: "📦 Restock Inventory", onclick: () => restockInventory()}
    ]
    return (
    
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
                    <FaBoxOpen className="text-blue-600" />
                    Inventory Management
                </h1>
                <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    onClick={() => window.open("/client/inventory/view", "_blank")}
                >
                    <FaEye />
                    View Inventory
                </button>
            </div>

            {/* Inventory Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Stock Alerts */}
                <div className="lg:col-span-2">
                    <StockAlert />
                </div>

                {/* Quick Actions (Floating Card) */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col gap-3 items-center text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">⚡ Quick Actions</h2>
                    {
                        quickActions.map(({label, onclick}, index) => (
                            <button 
                                key={index}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                                onClick={onclick}                                
                            >
                                {label}
                            </button>
                        ))
                    }
                </div>

                {/* Inventory Filters - Full Width for Better Usability */}
                <div className="lg:col-span-3">
                    <InventoryFilters />
                </div>
            </div>


            {/* Inventory List */}
            <InventoryList />
        </div>
    );
};

