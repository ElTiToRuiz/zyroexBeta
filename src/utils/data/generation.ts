import { Order, OrderWithProduct, Product, Shipment } from "../types";
import { orders } from "./ordersData";
import { products } from "./productsData";

export const generateOrders = (quantity: number): Order[] => {
    if(quantity < 1) return [];
    if (quantity > orders.length) quantity = orders.length;
    const ordersArray: Order[] = [];
    for (let i = 0; i < quantity; i++) {
        let newOrder;
        while (!newOrder || ordersArray.includes(newOrder)) {
            newOrder = orders[Math.floor(Math.random() * orders.length)];
        }
        newOrder.products = genereateRandomProducts();
        ordersArray.push(newOrder);
    }
    return ordersArray;
}

const genereateRandomProducts = () => {
    const quantity = Math.floor(Math.random() * 4) + 1;
    const productsArray: Product[] = [];
    for (let i = 0; i < quantity; i++) {
        let product;
        while (!product || productsArray.includes(product)) {
            product = products[Math.floor(Math.random() * products.length)];
        }
        productsArray.push(product);
    }
    const productsWithQuantity: OrderWithProduct[] = productsArray.map(product => {
        return {
            product,
            quantity: Math.floor(Math.random() * 5) + 1
        }
    })
    return productsWithQuantity;
}


export const genereateShipments = (orders: Order[]): Shipment[] => {
    const shipments: Shipment[] = orders.map(order => {
        return {
            id: 'S' + order.id,
            orderId: order.id,
            trackingNumber: Math.random().toString(36).substring(7),
            shipmentStatus: order.status,
            orderDate: new Date(order.createdAt),
            previstedDeliveryDate: new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 4)),
            clientName: order.customerName,
            clientAddress: order.customerAddress,
            clientEmail: order.customerEmail,
            additionalNotes: order.additionalNotes,
            urgent: order.urgent
        }
    });
    return shipments;
}
