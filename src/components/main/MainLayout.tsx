import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NotificationPopup } from './NotificationPopup';
import { useAuthUser } from '../../context/authContext';

export const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Set isMobile based on the window width (<768px means mobile)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { authUser } = useAuthUser();

    // Load sidebar state from localStorage
    useEffect(() => {
        const sidebarState = localStorage.getItem("sidebar");
        if (sidebarState) setIsOpen(JSON.parse(sidebarState));
    }, []);

    // Listen to window resize events to update isMobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
            <Header toggleSidebar={toggleSidebar} isOpen={isOpen}/>

            <div className="flex flex-1 overflow-hidden relative">
                {isMobile ? (
                // Mobile view: show either the sidebar or the main content
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="sidebar-mobile"
                                className="absolute inset-0 bg-gray-800 text-white z-50"
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'tween', duration: 0.4 }}
                            >
                                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} mobile />
                            </motion.div>
                        ) : (
                            <motion.section
                                key="content-mobile"
                                className="flex-1 overflow-auto bg-gray-100 p-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: 'tween', duration: 0.4 }}
                            >
                                <Outlet context={{ isOpen }}/>
                            </motion.section>
                        )}
                    </AnimatePresence>
                ) : (
                // Desktop view: show sidebar and content side-by-side
                    <>
                        <motion.div
                            className="bg-gray-800 text-white overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: isOpen ? 256 : 0 }}
                            transition={{ type: 'tween', duration: 0.4 }}
                        >
                            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} mobile />
                        </motion.div>

                        <motion.section 
                            className="flex-1 overflow-auto bg-gray-100 p-6"
                            transition={{ type: 'tween', duration: 0.4 }}
                        >
                            <Outlet />
                        </motion.section>
                    </>
                )}

                {authUser?.role !== "pending" && <NotificationPopup />}
            </div>
        </div>
    );
};
