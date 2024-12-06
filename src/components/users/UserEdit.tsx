import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { useAuthUser, User } from "../../context/authContext";
import { IoMdClose } from "react-icons/io";

export const EditUser = ({ user, onCancel }: { user: User, onCancel: () => void }) => {
    const { hasSuperAdminRole, authUser } = useAuthUser();
    if(!authUser) return null;
    const [editedUser, setEditedUser] = useState<User>(user);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const { updateUser, deleteUser } = useUserContext();
    
    const saveChanges = () => {
        updateUser(editedUser);
        onCancel();
    };

    const rmUser = () => {
        deleteUser(user);
        onCancel();
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative w-full max-w-md mx-auto mt-12">
                <div className="w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <img
                        src="https://i0.wp.com/static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg?ssl=1"
                        alt={authUser.username}
                        className="w-24 h-24 rounded-full mb-4 object-cover"
                        />
                    </div>
            
                    {/* Username Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                        type="text"
                        name="username"
                        value={editedUser.username}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
            
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
            
                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                        name="role"
                        value={editedUser.role}
                        onChange={handleInputChange}
                        className="w-full p-3 mt-2 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                        <option value="pending">Pending</option>
                        <option value="staff">Staff</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                        {hasSuperAdminRole() && <option value="superadmin">Superadmin</option>}
                        </select>
                    </div>
            
                    {/* Action Buttons */}
                    <div className="flex justify-between space-x-4 mt-6">
                        <button className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={rmUser}
                        >
                            Delete
                        </button>
                        <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={saveChanges}
                        >
                            Save
                        </button>
                    </div>
                </div>
            
                {/* Close Button */}
                <div onClick={onCancel} className="absolute top-4 right-4 cursor-pointer">
                    <IoMdClose className="text-2xl text-gray-500" />
                </div>
            </div>
        </div>
    );
      
};
