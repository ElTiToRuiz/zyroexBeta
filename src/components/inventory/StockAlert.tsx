import React from 'react';
import { useInventory } from '../../context/InventoryContext';

export const StockAlert: React.FC = () => {
  // Usamos el hook useInventory para acceder al estado del inventario
	const { inventory } = useInventory();

	// Filtramos los productos fuera de stock y con bajo stock
	const outOfStockItems = inventory.filter(product => product.stockQuantity === 0).map(product => product.name);
	const lowStockItems = inventory.filter(product => 0 < product.stockQuantity && product.stockQuantity <= product.threshold).map(product => product.name);

	return (
		<div className="p-6 bg-blue-50 border-l-4 rounded-lg shadow-blue-100 shadow-sm space-y-6 hover:bg-blue-100  
		hover:shadow-blue-950 hover:shadow-md hover:translate-y-[-5px] transition-all duration-300">
			<h1 className="text-4xl text-center font-semibold ">Stock Alerts</h1>
			
			{/* Responsive Grid: Two columns on larg screens, one column on mobile */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<StockList
					title="Out of Stock"
					items={outOfStockItems}
					icon="🚫"
					divColor="bg-red-50 border-l-4 border-red-600 hover:bg-red-100 hover:shadow-red-950 hover:shadow-md transition-all duration-300"
					iconColor="text-red-700"
					titleColor="text-red-800"
					emptyMessage="No out of stock items."
				/>

				<StockList
					title="Low Stock"
					items={lowStockItems}
					icon="⚠️"
					divColor="bg-yellow-50 border-l-4 border-yellow-600 hover:bg-yellow-100 hover:shadow-yellow-950 hover:shadow-md transition-all duration-300"
					iconColor="text-yellow-700"
					titleColor="text-yellow-800"
					emptyMessage="No low stock items."
				/>
			</div>
		</div>
	);
};

// StockList.tsx

interface StockListProps {
	title: string;
	items: string[];
	icon: string;
	divColor: string;
	iconColor: string;
	titleColor: string;
	emptyMessage: string;
}

// Componente genérico para mostrar listas de productos fuera de stock o con bajo stock
export const StockList = ({ title, items, icon, divColor, iconColor, titleColor, emptyMessage } : StockListProps) => {
	return (
		<div className={`rounded-lg p-4 shadow-sm ${divColor}`}>
			<h4 className={`text-lg font-medium ${titleColor} mb-2`}>{title}</h4>
			{items.length > 0 ? (
				<ul className="space-y-2">
					{
						items.map((item, index) => (
							<li key={index} className="flex items-center space-x-2 text-lg font-semibold">
								<span className={iconColor}>{icon}</span>
								<span>{item}</span>
							</li>
          				))
					}
				</ul>
			) : (
				<p className="text-gray-700">{emptyMessage}</p>
			)}
		</div>
	);
};
