import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NotificationPopup } from './NotificationPopup';
import { useAuthUser } from '../../context/authContext';

export const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { authUser } = useAuthUser();

    // Lee el estado del sidebar del localStorage
    useEffect(() => {
        const sidebarState = localStorage.getItem("sidebar");
        if (sidebarState) setIsOpen(JSON.parse(sidebarState));
    }, []);

    const toggleSidebar = () => {
        setIsOpen((prev) => {
            const newState = !prev;
            localStorage.setItem("sidebar", JSON.stringify(newState));
            return newState;
        });
    };    

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Header animado */}
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar con animación */}
                {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />}

                {/* Contenido principal: se le aplica margen condicional según el estado del sidebar */}
                <motion.section 
                    className={`flex-1 overflow-auto bg-gray-100 p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.section>

                {/* Notificaciones emergentes */}
                {authUser?.role !== "pending" && <NotificationPopup />}
            </div>
        </div>
    );
};
