import { FaTachometerAlt, FaWarehouse, FaChartBar, FaBell, FaUsers, FaCog, FaShippingFast, FaRegUser, FaBox } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../context/authContext';
import { TbLock } from 'react-icons/tb';
import { GiArtificialIntelligence } from 'react-icons/gi';



export const Sidebar = ({ isOpen }: {isOpen:boolean}) => {;
    const navigate = useNavigate();

    const menuItems = [
        { icon: <FaTachometerAlt />, label: 'Dashboard', redirectUrl: '/' },
        { icon: <FaBox />, label: 'Orders', redirectUrl: '/orders' },
        { icon: <FaWarehouse />, label: 'Inventory', redirectUrl: '/inventory' },
        { icon: <FaChartBar />, label: 'Statistics', redirectUrl: '/statistics' },
        { icon: <FaRegUser />, label: 'Users', redirectUrl: '/users',  },
        { icon: <FaUsers />, label: 'Teams', redirectUrl: '/teams' },
    ];

    const blockedMenuItems = [
        { icon: <FaShippingFast />, label: 'Delivery', redirectUrl: '/unauthorized'},
        { icon: <FaBell />, label: 'Notifications', redirectUrl: '/unauthorized'},
        { icon: <FaCog />, label: 'Configuration', redirectUrl: '/unauthorized'},
        { icon: <GiArtificialIntelligence />, label: 'AI', redirectUrl: '/unauthorized'},
    ]

    const liStyle = "flex items-center space-x-4 p-2 rounded-lg first-line:text-center whitespace-nowrap w-auto min-w-[220px] hover:bg-gray-700 cursor-pointer transition hover:translate-y-[-3px]";
    const blockedLiStyle = "relative flex items-center gap-4 p-2 rounded-lg first-line:text-center whitespace-nowrap w-auto min-w-[230px] bg-gray-800 hover:bg-gray-600 cursor-pointer transform transition-transform duration-300 ease-in-out hover:-translate-y-1"

    return (
        <aside className={`lg:block sticky top-0 w-64 bg-gray-800 text-white py-6 px-4  h-dvh shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
            <nav className="mt-20 fixed">
                <ul>
                    {menuItems.map(({ icon, label, redirectUrl }) => {
                        {
                            return (
                                <li key={label} className={liStyle} onClick={() => navigate(redirectUrl)}>
                                    <span className="text-xl">{icon}</span>
                                    <span>{label}</span>
                                </li>
                            )                            
                        }
                    })}
                    
                    {
                        blockedMenuItems.map(({ icon, label }) => (
                            <li key={label} className={blockedLiStyle}>
                                <span className="text-2xl text-gray-300">{icon}</span>
                                <span className="text-gray-200 font-medium">{label}</span>

                                <p 
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md px-4 py-2"
                                >
                                    <TbLock className="size-6 mr-2" />
                                    <span className="text-sm font-semibold">Not available on Demo</span>
                                </p>
                            </li>
                        ))
                    }



                </ul>
            </nav>
        </aside>
    );
};
