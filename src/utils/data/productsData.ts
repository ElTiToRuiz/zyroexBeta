import { Product } from "../types";

const randomUUID = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const products: Product[] = [
    {
        id: randomUUID(),
        name: 'MacBook Pro 15"',
        sku: 'MC-15-1001',
        price: 1500,
        stock: 25,
        threshold: 5,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/MacBook_Pro_15_inch.png',
        category: 'Laptop',
        rating: 4.8,
        description: 'Powerful laptop with Retina display, fast processors, and long battery life for professionals.'
    },
    {
        id: randomUUID(),
        name: 'Wireless Mouse',
        sku: 'WM-1002',
        price: 25,
        stock: 100,
        threshold: 10,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Logitech_MX_Master_3.jpg',
        category: 'Peripherals',
        rating: 4.6,
        description: 'Ergonomic wireless mouse with customizable buttons and precise tracking for productivity.'
    },
    {
        id: randomUUID(),
        name: 'Keyboard Mechanical',
        sku: 'KM-2003',
        price: 120,
        stock: 60,
        threshold: 15,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Logitech_MX_Keys.png',
        category: 'Peripherals',
        rating: 4.7,
        description: 'Premium mechanical keyboard with tactile keys for fast typing and durability.'
    },
    {
        id: randomUUID(),
        name: 'Smartphone Galaxy X10',
        sku: 'SG-4004',
        price: 800,
        stock: 45,
        threshold: 5,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Samsung_Galaxy_S10e.jpg',
        category: 'Smartphone',
        rating: 4.5,
        description: '5G-enabled smartphone with a powerful camera, sleek design, and vibrant display.'
    },
    {
        id: randomUUID(),
        name: 'Bluetooth Headphones',
        sku: 'BH-5005',
        price: 100,
        stock: 120,
        threshold: 30,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Beats_Studio3_Wireless.jpg',
        category: 'Audio',
        rating: 4.4,
        description: 'Noise-canceling wireless headphones with deep bass and long battery life for immersive listening.'
    },
    {
        id: randomUUID(),
        name: '4K TV 55"',
        sku: 'TV-6006',
        price: 550,
        stock: 30,
        threshold: 3,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Sony_XBR-55X900F_4K_TV.jpg',
        category: 'Electronics',
        rating: 4.6,
        description: '55-inch 4K UHD Smart TV with vibrant colors and built-in streaming apps for an enhanced viewing experience.'
    },
    {
        id: randomUUID(),
        name: 'Smartwatch FitTrack',
        sku: 'SW-7007',
        price: 250,
        stock: 80,
        threshold: 20,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Apple_Watch_Series_3.jpg',
        category: 'Wearables',
        rating: 4.3,
        description: 'Stylish smartwatch with fitness tracking, heart rate monitoring, and notifications on the go.'
    },
    {
        id: randomUUID(),
        name: 'Gaming Mouse',
        sku: 'GM-8008',
        price: 50,
        stock: 150,
        threshold: 10,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Logitech_G502_Hero.jpg',
        category: 'Peripherals',
        rating: 4.5,
        description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.'
    },
    {
        id: randomUUID(),
        name: 'External SSD 1TB',
        sku: 'SSD-9009',
        price: 120,
        stock: 40,
        threshold: 8,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Samsung_T5_1TB.jpg',
        category: 'Storage',
        rating: 4.8,
        description: 'Fast and portable 1TB external SSD with quick file transfers and reliable performance.'
    },
    {
        id: randomUUID(),
        name: 'Digital Camera 20MP',
        sku: 'DC-1010',
        price: 600,
        stock: 20,
        threshold: 2,
        imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Sony_A6000.jpg',
        category: 'Camera',
        rating: 4.7,
        description: '20MP mirrorless digital camera with interchangeable lenses and high-quality image capture.'
    }
];
