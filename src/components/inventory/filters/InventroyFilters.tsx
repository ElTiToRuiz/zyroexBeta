import React, { useState, useEffect } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { FilterInput } from './FilterInput';
import { FilterToggle } from './FilterToggle';
import { useInventory } from '../../../context/InventoryContext';

export const InventoryFilters: React.FC = () => {
    const [showFilters, setShowFilters] = useState<boolean>(false);

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

    // Aplica los filtros automáticamente cuando cambian
    useEffect(() => {
        applyFilters();
    }, [
        nameFilter,
        stockQuantityMinFilter,
        stockQuantityMaxFilter,
        filterOutOfstockQuantity,
        filterLowstockQuantity
    ]);

    return (
        <div className="p-4 bg-white shadow-lg rounded-xl transition-all">
            <div
                className="flex items-center justify-between group"
                onClick={() => setShowFilters(!showFilters)}
            >
                <h3 className="text-lg font-semibold text-gray-700">🔎 Inventory Filters</h3>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowFilters(!showFilters);
                    }}
                    className="text-gray-600 group-hover:text-indigo-600 transition"
                >
                    {showFilters ? <FaAngleDoubleUp size={24} /> : <FaAngleDoubleDown size={24} />}
                </button>
            </div>


            {showFilters && (
                <div className="space-y-4 animate-fade-in mt-2">
                    <FilterInput
                        label="Product Name"
                        value={nameFilter}
                        onChange={(value) => setNameFilter(value as string)}
                        placeholder="Search by name"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FilterInput
                            label="Min Stock"
                            value={stockQuantityMinFilter}
                            onChange={(value) => setstockQuantityMinFilter(value as number | '')}
                            type="number"
                            placeholder="Min stock"
                        />

                        <FilterInput
                            label="Max Stock"
                            value={stockQuantityMaxFilter}
                            onChange={(value) => setstockQuantityMaxFilter(value as number | '')}
                            type="number"
                            placeholder="Max stock"
                        />
                    </div>

                    <div className="flex flex-row justify-start space-x-8">
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
                </div>
            )}
        </div>
    );
};
