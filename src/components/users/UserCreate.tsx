import { useState } from "react";
import { useUserContext } from "../../context/userContext";
import { User } from "../../utils/types";

type newUser = {
    username: string;
    email: string;
    role: string;
}
export const CreateUser = ({changeCreate}:{changeCreate:(a: boolean)=>void}) => {
    const [error, setError] = useState<string | null>(null);
    const [newUser, setNewUser] = useState<newUser>({
        username: '',
        email: '',
        role: 'staff'
    });

    const { createNewUser } = useUserContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }


    const handleCreateUser = () => {
        if(newUser.username === '' || newUser.email === ''){
            setError('Username and Email are required');
            return;
        }
        setError(null);
        createNewUser(newUser as User);
        changeCreate(false);
    }
    
    return ( 
        <div
            className="w-full flex flex-col space-y-6 bg-white p-10 rounded-lg shadow-lg max-w-md mx-auto mt-12 transform transition-all z-50"
        >
            {error && (
                <div className="p-4 absolute top-0 left-0 translate-x-[40%]">
                    <p className="text-red-600">{error}</p>
                </div>
            )}
            <div className="mt-3">
                <img
                    src="https://i0.wp.com/static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg?ssl=1"
                    alt="profileImg"
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    required
                    type="text"
                    name="username"
                    placeholder='Enter username'
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    required
                    type="email"
                    name="email"
                    placeholder='Enter email'
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                    name="role"
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="pending">Pending</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => changeCreate(false)} 

                >
                    Cancel
                </button>
                <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={handleCreateUser}
                >
                    Create
                </button>
            </div>
        </div>
    )
}
