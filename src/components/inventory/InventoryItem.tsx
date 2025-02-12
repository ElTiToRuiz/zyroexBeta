import { useState } from 'react';
import { EditableForm } from './InventoryItemEditable';
import { Product } from '../../utils/types';
import { useSettings } from '../../context/settingContext';

export const InventoryItem = ({product}:{product:Product}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isLowStock = product.stock > 0 && product.stock <= product.threshold;
    const isOutOfStock = product.stock === 0;

    // Handle opening and closing the modal
    const handleClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const { getCurrencyChange } = useSettings(); 

    return (
        <>
            <div
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl hover:translate-y-[-3px] transition-shadow duration-300 ease-in-out cursor-pointer"
                onClick={handleClick}
                id={`i-${product.id}`}
            >
                <div className="w-full md:w-1/3 p-4 flex justify-center items-center bg-gray-100">
                <img
                    src={"/images"}
                    alt={product.name}
                    className="object-cover w-32 h-32 md:w-48 md:h-48 rounded-md shadow-md"
                />
                </div>

                <div className="w-full md:w-2/3 p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className='text-[0.75rem] italic text-gray-400 py-1'>#{product.id}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        SKU: <span className="font-medium text-gray-700">{product.sku}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                        Price: <span className="font-bold">{getCurrencyChange({number: product.price})}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                        Stock: <span className="font-bold">{product.stock}</span>
                    </p>

                    {isLowStock && (
                        <p className="mt-2 text-yellow-600 font-medium">
                            ⚠️ Low Stock! Only {product.stock} items left.
                        </p>
                    )}
                    {isOutOfStock && (
                        <p className="mt-2 text-red-600 font-medium">
                            🚫 Out of Stock
                        </p>
                    )}
                </div>
            </div>

            {isModalOpen  && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <span
                            className="absolute top-3 right-3 text-red-800 cursor-pointer bold font-bold hover:text-red-950 hover:translate-y-[-3px] transition-transform duration-300 ease-in-out"
                            onClick={handleCloseModal}
                        >
                            ✕
                        </span>
                        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                        
                        <EditableForm
                            product={product}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
        )}
        </>
    );
};
