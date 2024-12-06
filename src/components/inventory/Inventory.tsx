import { InventoryList } from "./InventoryList";
import { StockAlert } from "./StockAlert";
import { InventoryProvider } from "../../context/InventoryContext";
import { InventoryFilters } from "./filters/InventroyFilters";


export const Inventory = () => {
	
	return (
		<InventoryProvider>
			<div className="container mx-auto p-6 h-full">
				<h1 className="text-2xl font-bold mb-6">Inventory Management Dashboard</h1>
				<StockAlert />
				<InventoryFilters />
				<div className="mt-4">
					<InventoryList />	
				</div>
			</div>
		</InventoryProvider>
	);
};
