import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { fetchAssignOrder, fetchGetRevenue, fetchMakeOrderUrgent, fetchOrderProducts, fetchUnassignOrder, getOrders, saveOrderStatus } from "../services/fetch/fetchOrders";
import { Product } from "../utils/products";
import { socket } from "../services/sockets/socket";
import { handleNewOrder, handleUpdateOrder } from "../services/sockets/orderSocket";
import { OrdersByStatus } from "../components/orders/OrderTable";
import { useAuthUser } from "./authContext";

// Define types for Order and context
export type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    status: string;
    urgent: boolean;
    additionalNotes: string;
    createdAt: string;
    assignedTeam: string[];
};



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
    changeOrderTeam: ({orderId, teamId, add}:handleTeamOrderProps) => void;
    getRevenue: () => Promise<number>;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

type OrdersProviderProps = {
    children: ReactNode;
};

type handleTeamOrderProps = {
    orderId: string;
    teamId: string;
    add: boolean;
}

export const OrdersProvider = ({ children }:OrdersProviderProps) => {
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(orderList);
    const [filteredByStatus, setFilteredByStatus] = useState<OrdersByStatus | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("All");
    const [urgent, setUrgent] = useState<boolean>(false);
    const {authUser, hasAdminRole} = useAuthUser()

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
        const handleNewOrderEvent = (order: Order) => handleNewOrder({order, orderList, setOrderList});
        const handleUpdateOrderEvent = (order: Order) => handleUpdateOrder({order, orderList, setOrderList});
        socket.on('new-order', handleNewOrderEvent);
        socket.on('update-order', handleUpdateOrderEvent);

        return () => {
            socket.off('new-order', handleNewOrderEvent);
            socket.off('update-order', handleUpdateOrderEvent);
        }   
    }, [orderList]);

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
            const response = await getOrders(() => hasAdminRole(), authUser);
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
        const products = await fetchOrderProducts(order);
        console.log(products);
        type OrderWithProduct = {
            product: Product;
            quantity: number;
        }
        
        const productList:Product[] = products.map((product: OrderWithProduct) => { 
            return {
                id: product.product.id,
                name: product.product.name,
                quantity: product.quantity,
                price: product.product.price,
                stockQuantity: product.product.stockQuantity,
            }
        })

        return productList; 
    }

    const saveStatusChange = async ({order, newValue}: {order: Order, newValue: string}) => {
        console.log(order, newValue);
        await saveOrderStatus({id: order.id, newValue});
    }

    const makeOrderUrgent = async (orderId: string) => {
        console.log(orderId);
        await fetchMakeOrderUrgent(orderId);
    }

    const changeOrderTeam = async ({orderId, teamId, add}:handleTeamOrderProps) => {
        if(add){
            console.log('add order to team');
            await fetchAssignOrder({orderId, teamId});
        }else{
            await fetchUnassignOrder({orderId, teamId});
            console.log('remove order from team');
        }
    }

    const getRevenue = async() => {
        const total = await fetchGetRevenue();
        return total;

    }
    return (
        <OrdersContext.Provider
            value={{orders: orderList,urgent,filteredOrders,filteredByStatus, loading, error, setUrgent, filterOrders,rowFilter, resetFilters, getProductsFromOrder, saveStatusChange, filterByStatus, setStatus, makeOrderUrgent, changeOrderTeam, getRevenue}}
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