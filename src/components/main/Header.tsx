import React from 'react';
import { FaAlignJustify, FaHome, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthUser } from '../../context/authContext';
import { IconButton } from './IconButton';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { authUser } = useAuthUser();
    const navigate = useNavigate();

    return (
        <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="bg-gray-700 text-white p-4 flex justify-between items-center shadow-md"
        >
            {/* Botón para togglear el sidebar (visible solo si el usuario no está en estado "pending") */}
            {authUser && authUser.role !== 'pending' && (
                <IconButton 
                    onClick={toggleSidebar}
                    icon={<FaAlignJustify />} 
                    label="Toggle Sidebar"
                />
            )}

            {/* Logo o nombre de la aplicación, con efecto hover */}
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate('/')}
            >
                Nexora Demo App
            </motion.div>

            {/* Botones de navegación */}
            <div className="flex space-x-6">
                <IconButton
                    onClick={() => navigate('/')}
                    icon={
                        <FaHome className="cursor-pointer hover:text-gray-400 transition-transform duration-200" />
                    }
                    label="Home"
                />

                <IconButton
                    onClick={() => navigate('/profile')}
                    icon={
                        <FaUser className="cursor-pointer hover:text-gray-400 transition-transform duration-200" />
                    }
                    label="Profile"
                />
            </div>
        </motion.header>
    );
};
