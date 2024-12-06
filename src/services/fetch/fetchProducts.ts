import { mainEndpoint } from "../../utils/endpoints";
import { NewProduct, Product } from "../../utils/products";

const getProductsFromAPI = async () => {
    const API_PATH = `${mainEndpoint}/products`;
    const response = await fetch(API_PATH);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const products =( await response.json()) as Product[];
    return products;
}

export const getProducts = async () => {
    // Intentar obtener de localStorage
    // const cachedProducts = localStorage.getItem('inventory');
    // if (cachedProducts) {
    //     console.log('Using cached products');
    //     return JSON.parse(cachedProducts);
    // }

    // Si no hay caché, hacer una petición al backend
    try {
        console.log('Fetching products from API');
        const products = await getProductsFromAPI();
        // Guardar en localStorage
        localStorage.setItem('inventory', JSON.stringify(products));
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};


export const addProductToAPI = async (product: NewProduct) => {
    const API_PATH = `${mainEndpoint}/products`;
    const response = await fetch(API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to add product');
    }
}

export const updateProductInAPI = async (product: Product) => {
    const API_PATH = `${mainEndpoint}/products`;
    console.log(product);
    const response = await fetch(`${API_PATH}/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update product');
    }
}

export const deleteProductInAPI = async (product: Product) => {
    const API_PATH = `${mainEndpoint}/products`;
    const response = await fetch(`${API_PATH}/${product.id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to delete product');
    }
}