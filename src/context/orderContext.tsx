import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { OrdersByStatus } from "../components/orders/OrderTable";
import { useAuthUser } from "./authContext";
import { Order, OrderWithProduct, Product } from "../utils/types";
import { generateOrders } from "../utils/data/generation";
import { SpecialProduct } from "../components/orders/OrderCardModal";


type OrdersContextType = {
    orders: Order[];
    urgent: boolean;
    filteredOrders: Order[];
    filteredByStatus: OrdersByStatus | undefined;
    loading: boolean;
    error: string | null;
    setUrgent: (b:boolean) => void;
    filterOrders: (status: string) => void;
    resetFilters: () => void;
    rowFilter: () => OrdersByStatus;
    getProductsFromOrder: (order: Order) => Promise<Product[]>;
    saveStatusChange: ({order, newValue}: {order: Order, newValue: string}) => Promise<void>;
    filterByStatus: (filter: string) => Order[];
    setStatus: (status: string) => void;
    makeOrderUrgent: (orderId: string) => void;
    getRevenue: () => Promise<number>;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

type OrdersProviderProps = {
    children: ReactNode;
};

export const OrdersProvider = ({ children }:OrdersProviderProps) => {
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(orderList);
    const [filteredByStatus, setFilteredByStatus] = useState<OrdersByStatus | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("All");
    const [urgent, setUrgent] = useState<boolean>(false);
    const {authUser} = useAuthUser()

    const sortOrders = (orders: Order[]) => {
        const statusOrder: { [key: string]: number } = {
            pending: 0,
            processing: 1,
            shipped: 2,
            on_hold: 3,
            delivered: 4,
            cancelled: 5,
        };
    
        return orders.sort((a: Order, b: Order) => {
            if (statusOrder[a.status] !== statusOrder[b.status]) return statusOrder[a.status] - statusOrder[b.status];
            if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
    };


    const filterOrders = () => {
        let filteredOrders = orderList;
        if (urgent) filteredOrders = filteredOrders.filter(order => order.urgent);
        if (status !== "All") filteredOrders = filteredOrders.filter(order => order.status === status);
        setFilteredOrders(sortOrders(filteredOrders));
    };

    useEffect(() => {
        filterOrders();
    }, [status, urgent]);
    
    const filterByStatus = (status: string): Order[] => {
        return sortOrders(orderList.filter(order => order.status === status));  
    };

    const rowFilter = () => {
        const filterByStatusForTable = {
            pending: {
                statusId: "1",
                status: "pending",
                orders: filterByStatus("pending"),
            },
            processing: {
                statusId: "2",
                status: "processing",
                orders: filterByStatus("processing"),
            },
            shipped: {
                statusId: "3",
                status: "shipped",
                orders: filterByStatus("shipped"),
            },
            on_hold: {
                statusId: "4",
                status: "on_hold",
                orders: filterByStatus("on_hold"),
            },
            delivered: {
                statusId: "5",
                status: "delivered",
                orders: filterByStatus("delivered"),
            },
            cancelled: {
                statusId: "6",
                status: "cancelled",
                orders: filterByStatus("cancelled"),
            }
        } as OrdersByStatus

       return filterByStatusForTable;
    }

    
    useEffect(() => {
        fetchOrders();
    }, []);


    useEffect(() => {
        setFilteredByStatus(rowFilter());
        filterOrders();
    }, [orderList]); 
        
    const resetFilters = () => {
        setFilteredOrders(orderList);
    };

    const fetchOrders = async () => {
        try{
            if(!authUser) return;
            const response = generateOrders(10);
            setOrderList(response);
            setFilteredOrders(response);
            setFilteredByStatus(rowFilter());
            setLoading(false);
        }catch(error){
            setError('Error fetching orders');
            setLoading(false);
        }
    } 

    const getProductsFromOrder = async (order: Order) => {
        const products = order.products;
        const productList:SpecialProduct[] = products.map((product:OrderWithProduct) => { 
            return {
                id: product.product.id,
                name: product.product.name,
                quantity: product.quantity,
                price: product.product.price,
                stockQuantity: product.product.stock,
                sku: product.product.sku,
                stock: product.product.stock,
                threshold: product.product.threshold,
            }
        })

        return productList; 
    }

    const saveStatusChange = async ({order, newValue}: {order: Order, newValue: string}) => {
        order.status = newValue;
        setOrderList([...orderList]);
    }

    const makeOrderUrgent = async (orderId: string) => {
        const order = orderList.find(order => order.id === orderId);
        if(order){
            order.urgent = !order.urgent;
            setOrderList([...orderList]);
        }
    }

    const getRevenue = async() => {
        const total = orderList.map(order => {
            return order.products.reduce((acc, product) => {
                return acc + product.quantity * product.product.price;
            }, 0);
        }).reduce((acc, value) => acc + value, 0);
        return total;
    }

    return (
        <OrdersContext.Provider
            value={{orders: orderList,urgent,filteredOrders,filteredByStatus, loading, error, setUrgent, filterOrders,rowFilter, resetFilters, getProductsFromOrder, saveStatusChange, filterByStatus, setStatus, makeOrderUrgent, getRevenue}}
        >
            {children}
        </OrdersContext.Provider>
    );
};

// Custom hook to use the OrdersContext
export const useOrders = (): OrdersContextType => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error("useOrders must be used within an OrdersProvider");
    }
    return context;
}; 