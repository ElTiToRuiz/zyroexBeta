import { useEffect, useState } from "react"
import { InventoryProvider, useInventory } from "../../context/InventoryContext"
import { OrdersProvider, useOrders } from "../../context/orderContext"
import { TeamProvider } from "../../context/teamContext"
import { UserProvider, useUserContext } from "../../context/userContext"
import { DashboardContainer } from "./Dashboard"

export const Dashboard = () => {
    return (
        <OrdersProvider>
            <UserProvider>
                <TeamProvider>
                    <InventoryProvider>
                        <DashboardUtils />
                    </InventoryProvider>
                </TeamProvider>
            </UserProvider>
        </OrdersProvider>
    )
}

export type DashboardInfo = {
    orders: number;
    pendingOrders: number;
    completedOrders: number;
    revenue:  number;
    lowStockAlert: number;
    noStockAlert: number;
    totalUsers: number;
    pendingUsers: number;
    recentActivities: string[];
    ordersLastWeek: number;
    ordersLastDay: number;
}

export type AdminAdditionalDashboardInfo = {
    
}


const DashboardUtils =  () => {
    const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo | null>(null);
    const {orders, getRevenue} = useOrders();
    const {inventory} = useInventory();
    const {users} = useUserContext();
    
    const getDashboardInfo = async ()=>  {
        return {
            orders: orders.length,
            pendingOrders: orders.filter(order => order.status === 'pending').length,
            completedOrders: orders.filter(order => order.status === 'completed').length,
            revenue: await getRevenue(),
            lowStockAlert: inventory.filter(product => product.stock < product.threshold && product.stock !== 0).length,
            noStockAlert: inventory.filter(product => product.stock === 0).length,
            totalUsers: users.length,
            pendingUsers: users.filter(user => user.role === 'pending').length,
            recentActivities: [
                'New order received',
                'Inventory updated',
                'New user registered',
                'Order Id #1234 completed',
            ],
            ordersLastWeek: orders.filter(order => new Date(order.createdAt).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000).length,
            ordersLastDay: orders.filter(order => new Date(order.createdAt).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000).length
        }
    }
   
    useEffect(() => {
        getDashboardInfo().then((data) => setDashboardInfo(data));
    }, [orders, inventory, users]);

    return (
        dashboardInfo ? <DashboardContainer dashboardInfo={dashboardInfo} /> : <div>Loading...</div>
    )
}