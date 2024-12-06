import { FaTachometerAlt, FaWarehouse, FaChartBar, FaBell, FaUsers, FaCog, FaShippingFast, FaRegUser, FaBox } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../context/authContext';



export const Sidebar = ({ isOpen }: {isOpen:boolean}) => {
    const {authUser, hasAdminRole, hasSuperAdminRole} = useAuthUser();
    const navigate = useNavigate();

    const menuItems = [
        { icon: <FaTachometerAlt />, label: 'Dashboard', redirectUrl: '/' },
        { icon: <FaBox />, label: 'Orders', redirectUrl: '/orders' },
        { icon: <FaWarehouse />, label: 'Inventory', redirectUrl: '/inventory' },
        { icon: <FaChartBar />, label: 'Statistics', redirectUrl: '/statistics' },
        { icon: <FaRegUser />, label: 'Users', redirectUrl: '/users', permision: hasAdminRole },
        { icon: <FaUsers />, label: 'Teams', redirectUrl: '/teams' },
        { icon: <FaShippingFast />, label: 'Delivery', redirectUrl: '/shipments', permision: hasAdminRole },
        { icon: <FaBell />, label: 'Notifications', redirectUrl: '/notifications'},
        { icon: <FaCog />, label: 'Configuration', redirectUrl: '/configuration', permision: hasSuperAdminRole },
    ];

    
    if(!authUser) return null;
    if(authUser.role === 'pending') return null;

    const liStyle = "flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition hover:translate-y-[-3px]";
    
    return (
        <aside className={`lg:block sticky top-0 w-64 bg-gray-800 text-white p-6  h-dvh shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
            <nav className="mt-20 fixed">
                <ul>
                    {menuItems.map(({ icon, label, redirectUrl, permision }) => {
                        {
                            if (permision && !hasAdminRole()) return null;
                            return (
                                <li key={label} className={liStyle} onClick={() => navigate(redirectUrl)}>
                                    <span className="text-xl">{icon}</span>
                                    <span>{label}</span>
                                </li>
                            )                            
                        }
                    })}
                </ul>
            </nav>
        </aside>
    );
};
