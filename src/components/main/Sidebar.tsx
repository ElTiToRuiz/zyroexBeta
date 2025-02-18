import React from 'react';
import { FaTachometerAlt, FaWarehouse, FaChartBar, FaBell, FaUsers, FaCog, FaShippingFast, FaRegUser, FaBox, FaAlignJustify } from 'react-icons/fa';
import { TbLock } from 'react-icons/tb';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconButton } from './IconButton';

interface MenuItemData {
    icon: JSX.Element;
    label: string;
    redirectUrl: string;
    disabled?: boolean;
}

const menuItems: MenuItemData[] = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', redirectUrl: '/', disabled: false },
    { icon: <FaBox />, label: 'Orders', redirectUrl: '/orders', disabled: false },
    { icon: <FaWarehouse />, label: 'Inventory', redirectUrl: '/inventory', disabled: false },
    { icon: <FaChartBar />, label: 'Statistics', redirectUrl: '/statistics', disabled: true },
    { icon: <FaRegUser />, label: 'Users', redirectUrl: '/users', disabled: false },
    { icon: <FaUsers />, label: 'Teams', redirectUrl: '/teams', disabled: false },
    { icon: <FaBell />, label: 'Notifications', redirectUrl: '/notifications', disabled: false },
    { icon: <FaShippingFast />, label: 'Delivery', redirectUrl: '/delivery', disabled: true },
    { icon: <GiArtificialIntelligence />, label: 'AI', redirectUrl: '/ai', disabled: true },
    { icon: <FaCog />, label: 'Configuration', redirectUrl: '/configuration', disabled: false },
];

const sidebarVariants = {
    hidden: { x: -250, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1, 
        transition: { type: 'spring', stiffness: 170, damping: 80 }
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

interface MenuItemProps {
    item: MenuItemData;
    isActive: boolean;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onClick }) => {
    return (
        <motion.li
            variants={itemVariants}
            whileHover={{ scale: item.disabled ? 1 : 1.05 }}
            onClick={!item.disabled ? onClick : undefined}
            className={`
                relative group flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors
                ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            {/* Active indicator */}
            {isActive && <span className="absolute left-0 h-full w-1 bg-blue-300 rounded-r-md"></span>}
            <span className="text-2xl">{item.icon}</span>
            <span className="ml-2 font-medium">{item.label}</span>

            {/* Overlay for disabled items */}
            {item.disabled && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-md"
                >
                    <TbLock className="text-xl mr-2" />
                    <span className="text-sm font-semibold">Not available in Demo</span>
                </motion.div>
            )}
        </motion.li>
    );
};

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
    mobile?: boolean;
};

export const Sidebar = ({ isOpen, toggleSidebar, mobile = false }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (!isOpen) return null;

    const moveTo = ({path}:{path:string}) => {
        navigate(path)
        window.innerWidth < 756 && toggleSidebar()
    }

    // Use different container classes based on the `mobile` prop.
    const asideClasses = mobile 
        ? "h-full w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg"
        : "fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg z-50";

    return (
        <motion.aside
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            className={asideClasses}
        >
            <div className="p-6">
                {/* Sidebar header with logo and close button */}
                <div className="flex items-center justify-between mb-8">
                    <span 
                        className="text-3xl font-bold cursor-pointer" 
                        onClick={() => navigate('/')}
                    >
                        MyApp
                    </span>
                    <IconButton 
                        onClick={toggleSidebar}
                        icon={<FaAlignJustify />} 
                        label="Cerrar Sidebar"
                    />
                </div>

                <motion.ul 
                    initial="hidden" 
                    animate="visible" 
                    className="space-y-1"
                    transition={{ staggerChildren: 0.1 }}
                >
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.redirectUrl;
                        return (
                        <MenuItem
                            key={item.label}
                            item={item}
                            isActive={isActive}
                            onClick={() => moveTo({path: item.redirectUrl})}
                        />
                        );
                    })}
                </motion.ul>
            </div>
        </motion.aside>
    );
};