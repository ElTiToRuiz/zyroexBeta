import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import { useAuthUser } from "../../context/authContext";
import { Product } from "../../utils/types";
  
export const EditableForm = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [newName, setNewName] = useState(product.name);
  const [newSku, setNewSku] = useState(product.sku);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newStock, setNewStock] = useState(product.stock); 
  const [newThreshold, setNewThreshold] = useState(product.threshold);
  const [error, setError] = useState<string | null>(null);
  
  const { hasSuperAdminRole, hasAdminRole } = useAuthUser(); 
  const { onSaveChanges, onDelete } = useInventory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el comportamiento por defecto de recargar la página
    if (newStock < 0 || newThreshold < 0) {
      setError("Stock and threshold must be non-negative numbers.");
      return;
    }
    onSaveChanges(newName, newSku, newPrice, newStock, newThreshold);
    onClose();
  };

  const handleDelete = () => {
    onDelete(product.sku);
    onClose();
  };

  return (
    <div className="space-y-4">
        {/* ID Input */}
        <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                Product ID
            </label>
            <span className="text-gray-700 py-2 font-medium">#{product.id}</span>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            {hasAdminRole() && (
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>
            )}

            {/* SKU Input */}
            {hasSuperAdminRole() && (
                <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                        SKU
                    </label>
                    <input
                        type="text"
                        id="sku"
                        value={newSku}
                        onChange={(e) => setNewSku(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                </div>
            )}

            {/* Price Input */}
            {hasAdminRole() && (
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
            </div>
            )}

            {/* Stock Quantity Input */}
            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                </label>
                <input
                        type="number"
                        id="stock"
                        value={newStock}
                        onChange={(e) => setNewStock(Number(e.target.value))}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Low Stock Threshold Input */}
            <div>
                <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
                    Low Stock Threshold
                </label>
                <input
                    type="number"
                    id="threshold"
                    value={newThreshold}
                    onChange={(e) => setNewThreshold(Number(e.target.value))}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Error message */}
            {error && (
                <div className="text-red-500 text-sm mt-2">
                    {error}
                </div>
            )}

            {/* Botón de envío */}
            <div className="mt-4 flex justify-end">
                {hasSuperAdminRole() && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                    >
                        Delete
                    </button>
                )}
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </form>
    </div>
    );
};
