import { FaAlignJustify, FaHome, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../context/authContext';

interface SidebarProps {
    toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: SidebarProps) => {
    const { authUser } = useAuthUser();
    const navigate = useNavigate();

    const IconButton = ({ onClick, icon, label }: { onClick: () => void; icon: JSX.Element; label: string }) => (
        <button onClick={onClick} aria-label={label}>
            {icon}
        </button>
    );

    return (
        <header className="bg-gray-700 text-white p-4 flex justify-between items-center shadow-md">
            {/* Sidebar Toggle Button */}
            {
                authUser && authUser.role !== 'pending' && (
                    <IconButton 
                        onClick={toggleSidebar}
                        icon={<FaAlignJustify />} 
                        label="Toggle Sidebar"
                    />
                )
            }

            {/* Business Name / Logo */}
            <div className="text-xl font-bold">[Business Name / Logo]</div>

            <div className="flex space-x-6">
                {/* Home Button */}
                <IconButton
                    onClick={() => navigate('/')}
                    icon={<FaHome className="cursor-pointer hover:text-gray-400 transition-transform duration-200" />}
                    label="Go to Home"
                />

                {/* User Profile Button */}
                <IconButton
                    onClick={()=>navigate('/profile')}
                    icon={<FaUser className="cursor-pointer hover:text-gray-400 transition-transform duration-200" />}
                    label="User Profile"
                />
            </div>
        </header>
    );
};


