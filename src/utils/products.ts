export type Product = {
    id: string; // Unique identifier
    imageSrc?: string | File;
    name: string;
    sku: string;
    stockQuantity: number;
    price: number
    quantity?: number; 
    threshold: number;
}

export type NewProduct = {
    imageSrc?: string | File;
    name: string;
    sku: string;
    stockQuantity: number;
    price: number
    threshold: number;
}
