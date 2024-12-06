import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { useInventory } from '../../../context/InventoryContext';
import { FilterInput } from './FilterInput';
import { FilterToggle } from './FilterToggle';

export const InventoryFilters: React.FC = () => {
	const [showFilters, setShowFilters] = React.useState<boolean>(false);
    const {
        nameFilter,
        stockQuantityMinFilter,
        stockQuantityMaxFilter,
        filterOutOfstockQuantity,
        filterLowstockQuantity,
        setNameFilter,
        setstockQuantityMinFilter,
        setstockQuantityMaxFilter,
        setFilterOutOfstockQuantity,
        setFilterLowstockQuantity,
        applyFilters,
    } = useInventory();

    const handleApplyFilters = () => {
        applyFilters(); // Aplica los filtros al inventario
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <FaFilter size={20} />
                </button>
            </div>

            {showFilters && (
                <div className="space-y-4">
                    <FilterInput
                        label="Product Name"
                        value={nameFilter}
                        onChange={(value) => setNameFilter(value as string)}
                        placeholder="Search by name"
                    />

                    <FilterInput
                        label="Min stockQuantity"
                        value={stockQuantityMinFilter}
                        onChange={(value) => setstockQuantityMinFilter(value as number | '')}
                        type="number"
                        placeholder="Min stockQuantity"
                    />

                    <FilterInput
                        label="Max stockQuantity"
                        value={stockQuantityMaxFilter}
                        onChange={(value) => setstockQuantityMaxFilter(value as number | '')}
                        type="number"
                        placeholder="Max stockQuantity"
                    />

                    <div className="flex flex-row justify-start space-x-10">
                        <FilterToggle
                            label="Out of Stock"
                            checked={filterOutOfstockQuantity}
                            onChange={() => setFilterOutOfstockQuantity(!filterOutOfstockQuantity)}
                        />

                        <FilterToggle
                            label="Low Stock"
                            checked={filterLowstockQuantity}
                            onChange={() => setFilterLowstockQuantity(!filterLowstockQuantity)}
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleApplyFilters}
                            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
