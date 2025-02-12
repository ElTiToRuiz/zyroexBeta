import { useAuthUser } from "../../context/authContext";
import { useInventory } from "../../context/InventoryContext";
import { InventoryItem } from "./InventoryItem";
import { InventoryItemAdd } from "./InventoryItemAdd";

export const InventoryList = () => {
    const { filteringInventory } = useInventory();
    const { hasAdminRole } = useAuthUser();

    return (
        <div className="mt-6 bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Inventory Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteringInventory.map((product) => (
                    <InventoryItem product={product} key={product.id} />
                ))}
                {hasAdminRole() && <InventoryItemAdd />}
            </div>
        </div>
    );
};
