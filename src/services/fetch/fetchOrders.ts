import { User } from "../../context/authContext";
import { Order } from "../../context/orderContext";
import { mainEndpoint } from "../../utils/endpoints";

const fetchOrders = async (hasAdminRole: () => boolean, authUser: User): Promise<any> => {
    let ENPOINT: string;
    if (hasAdminRole()) {
        ENPOINT = `${mainEndpoint}/orders/admin`;
        console.log('Admin role detected'); 
    } else {
        ENPOINT = `${mainEndpoint}/orders/${authUser.id}`;
        console.log('No admin role detected');
    }

    const response = await fetch(ENPOINT, {credentials: 'include'});
    console.log(response)
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    return data;
}


export const getOrders = async (hasAdminRole:()=>boolean, authUser: User) => {
    // const cachedOrders = localStorage.getItem('orders');
    // if (cachedOrders) {
    //     console.log('Using cached orders');
    //     return JSON.parse(cachedOrders);
    // }

    try {
        console.log('Fetching orders from API');
        const orders = await fetchOrders(hasAdminRole, authUser);
        // localStorage.setItem('orders', JSON.stringify(orders));
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

export const fetchOrderProducts = async (Order: Order) => {
    try{
        const ORDER_PRODUCTS_ENDPOINT = `${mainEndpoint}/orders/products/${Order.id}/`;
        console.log(ORDER_PRODUCTS_ENDPOINT)
        const response = await fetch(ORDER_PRODUCTS_ENDPOINT);
        if (!response.ok) {
            throw new Error('Failed to fetch order products');
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error('Error fetching order products:', error);
        return [];
    }
} 

export const saveOrderStatus = async ({id, newValue}: {id: string, newValue: string}) => {
    try{
        console.log(id, newValue)
        const ORDER_STATUS_ENDPOINT = `${mainEndpoint}/orders/${id}`;
        const response = await fetch(ORDER_STATUS_ENDPOINT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status: newValue}),
        })
        if (!response.ok) {
            throw new Error('Failed to update order status');
        }
    }catch(error){
        console.log(error)
        console.error('Error updating order status:', error);
    }
}

export const fetchMakeOrderUrgent = async (orderId: string) => {
    try{
        const ORDER_URGENT_ENDPOINT = `${mainEndpoint}/orders/${orderId}/urgent`;
        console.log(ORDER_URGENT_ENDPOINT)
        const response = await fetch(ORDER_URGENT_ENDPOINT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            throw new Error('Failed to make order urgent');
        }
    }catch(error){
        console.error('Error making order urgent:', error);
    }
}

export const fetchAssignOrder = async ({orderId, teamId}: {orderId: string, teamId: string}) => {
    try{
        const ORDER_ASSIGN_ENDPOINT = `${mainEndpoint}/orders/${orderId}/assign`;
        console.log(ORDER_ASSIGN_ENDPOINT)
        const response = await fetch(ORDER_ASSIGN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({teamId}),
        })
        console.log(response) 
        if (!response.ok) {
            throw new Error('Failed to assign order');
        }
    }catch(error){
        console.error('Error assigning order:', error);
    }
}

export const fetchUnassignOrder = async ({orderId, teamId}: {orderId: string, teamId: string}) => {
    try{
        const ORDER_UNASSIGN_ENDPOINT = `${mainEndpoint}/orders/${orderId}/unassign`;
        console.log(ORDER_UNASSIGN_ENDPOINT)
        const response = await fetch(ORDER_UNASSIGN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({teamId}),
        })
        if (!response.ok) {
            throw new Error('Failed to unassign order');
        }
    }catch(error){
        console.error('Error unassigning order:', error);
    }
}

export const fetchGetRevenue = async () => {
    try{
        const REVENUE_ENDPOINT = `${mainEndpoint}/stats/revenue`;
        console.log(REVENUE_ENDPOINT)
        const response = await fetch(REVENUE_ENDPOINT);
        if (!response.ok) {
            throw new Error('Failed to fetch revenue');
        }
        const data = await response.json();
        return data.revenue;
    }catch(error){
        console.error('Error fetching revenue:', error);
        return 0
    }
}