export type User = {
    id: string;
    username: string;
    email: string;
    role: 'pending' | 'staff' | 'manager' | 'admin' | 'superadmin';
    lastLogin: Date;
};

export type Product = {
    id: string;
    name: string;
    sku: string;
    price: number
    stock: number;
    threshold: number;
}

export type NewProduct = {
    name: string;
    sku: string;
    stock: number;
    price: number
    threshold: number;
}

export type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    status: string;
    urgent: boolean;
    additionalNotes: string;
    createdAt: string;
    products: OrderWithProduct[];
    assignedTeam?: string[];
}
export type OrderWithProduct = {
    product: Product;
    quantity: number;
}

export type Team = {
    id: string;
    name: string;
    description: string;
    users: User[];
}

export type Shipment = {
    id: string;
    orderId: string;
    trackingNumber: string;
    shipmentStatus: string;
    orderDate: Date;
    previstedDeliveryDate: Date;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    additionalNotes: string;
    urgent: boolean;
}

export type Notification = {
    isRead: boolean,
    title: string,
    message: string,
    type: string,
    createdAt: Date,
    priority: 'low' | 'medium' | 'high'
}