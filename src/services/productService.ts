import { Product } from "../utils/types";


// Lógica para aplicar los filtros
export const applyFiltersToInventory = (
    inventory: Product[],
    nameFilter: string,
    stockQuantityMinFilter: number | '',
    stockQuantityMaxFilter: number | '',
    filterOutOfstockQuantity: boolean,
    filterLowstockQuantity: boolean
): Product[] => {
    let filteredItems = inventory;

    if (nameFilter) {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }

    if (stockQuantityMinFilter !== '') {
        filteredItems = filteredItems.filter(item => item.stock >= stockQuantityMinFilter);
    }

    if (stockQuantityMaxFilter !== '') {
        filteredItems = filteredItems.filter(item => item.stock <= stockQuantityMaxFilter);
    }

    if (filterOutOfstockQuantity) {
        filteredItems = filteredItems.filter(item => item.stock === 0);
    }

    if (filterLowstockQuantity) {
        filteredItems = filteredItems.filter(item => item.stock > 0 && item.stock <= item.threshold);
    }

    return filteredItems;
};
