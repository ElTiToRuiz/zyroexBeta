import React from "react";
import { useInventory } from "../../context/InventoryContext";
import { FaExclamationTriangle } from "react-icons/fa";
import { Product } from "../../utils/types";

export const StockAlert: React.FC = () => {
    const { outOfStockItems, lowStockItems } = useInventory();
    return (
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-5">
                ⚠️ Stock Alerts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StockList
                    title="Out of Stock"
                    items={outOfStockItems}
                    icon={<FaExclamationTriangle className="text-red-500" />}
                    divColor="bg-red-50 border-l-4 border-red-600 hover:bg-red-100"
                    emptyMessage="No out-of-stock items."
                />
                <StockList
                    title="Low Stock"
                    items={lowStockItems}
                    icon={<FaExclamationTriangle className="text-yellow-500" />}
                    divColor="bg-yellow-50 border-l-4 border-yellow-600 hover:bg-yellow-100"
                    emptyMessage="No low-stock items."
                />
            </div>
        </div>
    );
};

// StockList Component
interface StockListProps {
    title: string;
    items: Product[];
    icon: JSX.Element;
    divColor: string;
    emptyMessage: string;
}

const StockList: React.FC<StockListProps> = ({ title, items, icon, divColor, emptyMessage }) => {
    return (
        <div className={`p-4 rounded-xl shadow-md transition-all duration-300 ${divColor}`}>
            <h4 className="text-lg font-semibold flex items-center gap-2 mb-3">
                {icon} {title}
            </h4>
            {items.length > 0 ? (
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-between borderrounded-md px-4 border-orange-200 border-l-4"
                        >
                            <span className="font-medium text-gray-800">{item.name}</span>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                                {item.stock} left
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">{emptyMessage}</p>
            )}
        </div>
    );
};
