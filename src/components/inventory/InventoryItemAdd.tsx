import React, { useState } from "react";
import { useInventory } from "../../context/InventoryContext";

export const InventoryItemAdd = () => {
	// Obtener la función addInventoryItem desde el contexto
	const { addInventoryItem } = useInventory(); 

	// Estado para modal y formulario
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [image, setImage] = useState<File | null>(null);
	const [itemName, setItemName] = useState("");
	const [sku, setSku] = useState("");
	const [price, setPrice] = useState<string>("0");
	const [stock, setStock] = useState<number>(0);
	const [threshold, setThreshold] = useState<number>(0);

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
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		if (file) {
		setImage(file);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try{
			addInventoryItem(itemName, sku, parseFloat(price), stock, threshold);
			clean();
			setIsModalOpen(false);
		}catch(e){ 
			alert("Price must be a number");
			return;
		}
	};

	return (
		<div>
		{/* Botón para abrir el modal */}
		{!isModalOpen && (
			<div className="flex flex-col md:flex-row items-center justify-center w-full h-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl hover:translate-y-[-3px] transition-shadow duration-300 ease-in-out cursor-pointer">
			<button
				type="button"
				onClick={handleOpenModal}
				id="addInventoryItem"
				className="h-64 text-5xl text-indigo-600 hover:text-indigo-800 focus:outline-none text-center w-full"
			>
				+
			</button>
			</div>
		)}

		{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Inventory Item</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Nombre del artículo */}
							<div>
								<label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
								<input
									type="text"
									id="itemName"
									value={itemName}
									onChange={(e) => setItemName(e.target.value)}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>

							{/* SKU */}
							<div>
								<label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
								<input
									type="text"
									id="sku"
									value={sku}
									onChange={(e) => setSku(e.target.value)}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>

							{/* Price */}
							<div>
								<label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
								<input
									type="text"
									id="price"
									value={price}
									onChange={(e) => setPrice(e.target.value.replace(',', '.'))}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>

							{/* Stock */}
							<div>
								<label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
								<input
									type="number"
									id="stock"
									value={stock}
									onChange={(e) => setStock(Number(e.target.value))}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>

							{/* Threshold */}
							<div>
								<label htmlFor="threshold" className="block text-sm font-medium text-gray-700">Threshold</label>
								<input
									type="number"
									id="threshold"
									value={threshold}
									onChange={(e) => setThreshold(Number(e.target.value))}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>

							{/* Subir imagen */}
							<div>
								<label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
								<input
									type="file"
									id="image"
									onChange={handleImageChange}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
								/>
								{image && (
									<div className="mt-2 text-sm text-gray-500">Selected file: {image.name}</div>
								)}
							</div>

							{/* Pie del modal */}
							<div className="mt-4 flex justify-between">
								<button
									type="button"
									onClick={handleCloseModal}
									className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
								>
									Add Item
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
