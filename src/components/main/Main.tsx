import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Inventory } from "../inventory/Inventory";
import { OrdersProvider } from "../../context/orderContext";
import { Orders } from "../orders/OrdersContainer";
import { UserContainer } from "../users/UsersContainer";
import { UserProvider } from "../../context/userContext";
import { TeamContainer } from "../teams/TeamContainer";
import { ProfileContainer } from "../authentication/ProfileContainer";
import { ShipmentsPage } from "../shipment/ShipmentContainer";
import { NotificationContainer } from "../notification/NotificationView";
import { ConfigurationPage } from "../configuration/ConfigurationView";
import { PendingUserDashboard } from "../dashboard/DashboardPending";
import { TeamProvider } from "../../context/teamContext";
import { NotificationPopup } from "./NotificationPopup";
import { NotificationProvider } from "../../context/notificationContext";
import { useAuthUser } from "../../context/authContext";
import { Error } from "./Error";
import { Dashboard } from "../dashboard/DashboradMain";
import { Statistics } from "../stats/StatsContainer";


export const MainApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {authUser, hasAdminRole} = useAuthUser()

    useEffect(()=>{
        const sidebar = localStorage.getItem('sidebar');
        sidebar && setIsOpen(JSON.parse(sidebar));
    }, [])

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        localStorage.setItem('sidebar', JSON.stringify(!isOpen));
    }

    if(!authUser) return null;
  
    return (
        <NotificationProvider>
            <main className={`h-screen  ${isOpen ? "grid grid-cols-[auto_1fr]" :  "container"}`}>
                {isOpen && <Sidebar isOpen={isOpen} />}

                <section className="flex overflow-auto flex-col w-full">
                    <Header toggleSidebar={toggleSidebar} />
                    <Routes>
                        {
                            authUser?.role === 'pending' && <Route path="/" element={<PendingUserDashboard/>}/>
                        }
                        <Route path="/" element={<Dashboard />}/>

                        <Route path="/orders" 
                            element={
                                <OrdersProvider>
                                    <Orders />
                                </OrdersProvider>
                            } 
                        />

                        <Route path="/inventory" element={
                            authUser?.role === 'pending' ? <Navigate to="/unauthorized" /> : <Inventory/>
                        } />
                        
                        <Route path="/statistics" element={<Statistics/>} />
                            
                        <Route path="/users" element={
                            hasAdminRole() ? (
                                <UserProvider>
                                    <UserContainer />
                                </UserProvider>
                            ) : (
                                <Navigate to="/unauthorized" />
                            )
                        } />

                        <Route path='/teams' element={
                            authUser?.role === 'pending' ? <Navigate to="/unauthorized" /> : (
                                <TeamProvider>
                                    <TeamContainer/>
                                </TeamProvider>
                            )
                        }/>

                        <Route path="/shipments" element={
                            hasAdminRole() ? <ShipmentsPage/> : <Navigate to="/unauthorized" />                                
                        }/>

                        <Route path="/notifications" element={
                            authUser?.role === 'pending' ? <Navigate to="/unauthorized" /> :
                            <NotificationProvider>
                                <NotificationContainer/>
                            </NotificationProvider>
                        }/>

                        <Route path="/configuration" element={
                            hasAdminRole() ? <ConfigurationPage/> : <Navigate to="/unauthorized" /> 
                        }/>
                        
                        <Route path='/profile' element={ 
                            <ProfileContainer/>
                        }/>

                        <Route path='/unauthorized' element={
                            <Error message="You are not authorized to view this page" id="auth-error-002"/>
                        }/>
                    </Routes>
                </section>
                {
                    authUser.role !== 'pending' && <NotificationPopup/>
                }
                    
            </main>
        </NotificationProvider>
    );
}

