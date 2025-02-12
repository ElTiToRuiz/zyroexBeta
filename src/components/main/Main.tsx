import { Route, Routes, Navigate } from "react-router-dom";
import { Inventory } from "../inventory/Inventory";
import { OrdersProvider } from "../../context/orderContext";
import { Orders } from "../orders/OrdersContainer";
import { UserContainer } from "../users/UsersContainer";
import { UserProvider } from "../../context/userContext";
import { TeamContainer } from "../teams/TeamContainer";
import { ProfileContainer } from "../authentication/ProfileContainer";
// import { ShipmentsPage } from "../shipment/ShipmentContainer";
import { NotificationContainer } from "../notification/NotificationView";
// import { ConfigurationPage } from "../configuration/ConfigurationView";
import { PendingUserDashboard } from "../dashboard/DashboardPending";
import { TeamProvider } from "../../context/teamContext";
import { useAuthUser } from "../../context/authContext";
import { Error } from "./Error";
import { Dashboard } from "../dashboard/DashboradMain";
// import { Statistics } from "../stats/StatsContainer";
import { MainLayout } from "./MainLayout";
import { EmptyLayout } from "./Outlet";
import { InventoryProvider } from "../../context/InventoryContext";
import { InventoryClientView } from "../inventory/client/InventoryClient";


export const MainApp = () => {
    const {authUser, hasAdminRole} = useAuthUser()

    if(!authUser) return null;
  
    return (
        <main>
            <Routes>
                {/* Rutas con Sidebar y Header */}
                <Route element={<MainLayout />}>
                    {authUser?.role === "pending" && <Route path="/" element={<PendingUserDashboard />} />}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<OrdersProvider><Orders /></OrdersProvider>} />
                    <Route path="/inventory" element={authUser?.role === "pending" ? <Navigate to="/unauthorized" /> : <InventoryProvider><Inventory /></InventoryProvider>} />
                    {/* <Route path="/statistics" element={<Statistics />} /> */}
                    <Route path="/users" element={hasAdminRole() ? <UserProvider><UserContainer /></UserProvider> : <Navigate to="/unauthorized" />} />
                    <Route path="/teams" element={authUser?.role === "pending" ? <Navigate to="/unauthorized" /> : <TeamProvider><TeamContainer /></TeamProvider>} />
                    {/* <Route path="/shipments" element={hasAdminRole() ? <ShipmentsPage /> : <Navigate to="/unauthorized" />} /> */}
                    <Route path="/notifications" element={authUser?.role === "pending" ? <Navigate to="/unauthorized" /> : <NotificationContainer />} />
                    {/* <Route path="/configuration" element={hasAdminRole() ? <ConfigurationPage /> : <Navigate to="/unauthorized" />} /> */}
                    <Route path="/profile" element={<ProfileContainer />} />
                </Route>

                {/* Rutas sin Sidebar ni Header */}
                <Route element={<EmptyLayout />}>
                    <Route path="/client/inventory/view" element={<InventoryProvider><InventoryClientView/></InventoryProvider>} />
                    <Route path="/unauthorized" element={<Error message="You are not authorized to view this page" id="auth-error-002" />} />
                    <Route path="*" element={<Error message="Page not found" id="auth-error-003" />} />
                </Route>
            </Routes>
        </main>
    );
}

