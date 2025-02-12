import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { applyFiltersToInventory } from "../services/productService";
import { Product } from "../utils/types";
import { products } from "../utils/data/productsData";

interface InventoryContextType {
    inventory: Product[];
    outOfStockItems: Product[];
    lowStockItems: Product[];
    filteringInventory: Product[];
    filtersApplied: boolean;
    nameFilter: string;
    stockQuantityMinFilter: number | '';
    stockQuantityMaxFilter: number | '';
    filterOutOfstockQuantity: boolean;
    filterLowstockQuantity: boolean;
    setNameFilter: (value: string) => void;
    setstockQuantityMinFilter: (value: number | '') => void;
    setstockQuantityMaxFilter: (value: number | '') => void;
    setFilterOutOfstockQuantity: (value: boolean) => void;
    setFilterLowstockQuantity: (value: boolean) => void;
    fetchInventory: () => void;
    addInventoryItem: (name: string, sku: string, price: number, stockQuantity: number, threshold: number) => void;
    onSaveChanges: (name: string, sku: string, price: number, newstockQuantity: number, newThreshold: number) => void;
    onDelete: (sku: string) => void;
    applyFilters: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useInventory = (): InventoryContextType => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
};

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
    const [inventory, setInventory] = useState<Product[]>([]);
    const [filteringInventory, setFiltering] = useState<Product[]>(inventory);
    const [filtersApplied, setFiltersApplied] = useState<boolean>(false);

    // Low and Out of stock alerts
    const [outOfStockItems, setOutOfStockItems] = useState<Product[]>([]);
    const [lowStockItems, setLowStockItems] = useState<Product[]>([]);
    
    // Filtros
    const [nameFilter, setNameFilter] = useState<string>('');
    const [stockQuantityMinFilter, setstockQuantityMinFilter] = useState<number | ''>('');
    const [stockQuantityMaxFilter, setstockQuantityMaxFilter] = useState<number | ''>('');
    const [filterOutOfstockQuantity, setFilterOutOfstockQuantity] = useState<boolean>(false);
    const [filterLowstockQuantity, setFilterLowstockQuantity] = useState<boolean>(false);

    // Efecto para hacer el fetch cuando se monta el componente
    // Load inventory from localStorage or fetch it if not present
    useEffect(() => {
        const inventoryData = JSON.parse(localStorage.getItem('inventory') || '[]');
        // if inventory is not in local storage, fetch it
        if (inventoryData.length === 0) fetchInventory();
        else setInventory(inventoryData);
    }, []);

    // Save inventory to localStorage when it changes, skipping initial render
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
        else localStorage.setItem('inventory', JSON.stringify(inventory));
        
    }, [inventory]);

    useEffect(() => {
        // update filteringInventory when inventory changes but keeping filters
        applyFilters();
        setOutOfStockItems(inventory.filter(product => product.stock === 0));
        setLowStockItems(inventory.filter(product => product.stock > 0 && product.stock <= product.threshold));
    }, [inventory])


    // Fetch a la API para obtener los productos
    const fetchInventory = async () => {
        const newProducts = products;
        setInventory(newProducts);
        setFiltering(newProducts);
    };

    // Función para añadir un item al inventario
    const addInventoryItem = async (name: string, sku: string, price: number, stock: number, threshold: number) => {
        const newProduct: Product = {id: 'newId', name, price, sku, stock, threshold };
        try {
            setInventory([...inventory, newProduct]);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product. Try again!');
        }
    };

    // Función para guardar cambios en un producto
    const onSaveChanges = (name: string, sku: string, price: number, newstockQuantity: number, newThreshold: number) => {
        const updatedProduct = inventory.find(product => product.sku === sku);
        if (updatedProduct) {
            setInventory(inventory.map(product => {
                if (product.sku === sku) {
                    return { ...product, name, price, stock: newstockQuantity, threshold: newThreshold };
                }
                return product;
            }));
        }
    };

    // Función para eliminar un producto
    const onDelete = async (sku: string) => {
        const deletedProduct = inventory.find(product => product.sku === sku);
        if (!deletedProduct) return;
        try{
            setInventory(inventory.filter(product => product.sku !== sku));
        }catch(error){
            console.error('Error deleting product:', error);
            alert('Error deleting product. Try again!');
        }
    };

    // Función para aplicar los filtros
    const applyFilters = () => {
        const filteredItems = applyFiltersToInventory(
            inventory, nameFilter, stockQuantityMinFilter, stockQuantityMaxFilter, filterOutOfstockQuantity, filterLowstockQuantity
        );
        setFiltering(filteredItems);
        setFiltersApplied(true);
    };

    return (
        <InventoryContext.Provider value={{
            inventory,
            outOfStockItems,
            lowStockItems,
            filteringInventory,
            filtersApplied,
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
            fetchInventory,
            addInventoryItem,
            onSaveChanges,
            onDelete,
            applyFilters,
        }}>
            {children}
        </InventoryContext.Provider>
    );
};