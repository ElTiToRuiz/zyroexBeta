import { Product } from "../../utils/products";

type HandleNewProductProp = {
    product: Product;
    inventory: Product[];
    setInventory: (inventory: Product[]) => void
}  

export const handdleNewProduct = ({product, inventory, setInventory}:HandleNewProductProp ) => {
    setInventory([...inventory, product]);
    localStorage.setItem('inventory', JSON.stringify([...inventory, product]));
}

type HandleProductProp = {
    product: Product;
    setInventory: (inventory: Product[]) => void
}

export const handleUpdateProduct = ({product, setInventory}:HandleProductProp) => {
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const index = inventory.findIndex((item: Product) => item.id === product.id);
    inventory[index] = product;
    localStorage.setItem('inventory', JSON.stringify(inventory));
    setInventory(inventory);
}

export const handleDeleteProduct = ({product, setInventory}:HandleProductProp) => {
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const newInventory = inventory.filter((item: Product) => item.id !== product.id);
    localStorage.setItem('inventory', JSON.stringify(newInventory));
    setInventory(newInventory);
}