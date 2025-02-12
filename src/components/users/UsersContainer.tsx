import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import { Loading } from '../main/Loading';
import { CreateUser } from './UserCreate';
import { EditUser } from './UserEdit';
import { useAuthUser } from "../../context/authContext";
import { User } from '../../utils/types';


export const UserContainer = () => {
    const { users, loading, error } = useUserContext();
    const {hasSuperAdminRole} = useAuthUser()
    const [userCreating, setUserCreating] = useState<boolean>(false);
    const [userEditing, setIsEditing] = useState<User | null>(null);

    const onEdit = (user:User) => setIsEditing(user);
    const onCancel = () => setIsEditing(null);

    <Loading loading={loading} loadingmsg="Loading users" error={error} />
    const changeCreate = (b:boolean) => {
        setUserCreating(b);
    }
    useEffect(() => {
        if (userCreating) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [userCreating])

    if (!users || users.length === 0) {
        return (
            <div>
                <div className='flex my-4 justify-end mx-10'>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
                        onClick={() => changeCreate(true)} 
                    >
                        Create User
                    </button>
                </div>
                {userCreating && <CreateUser changeCreate={changeCreate} />}
                <div className="flex justify-center items-center h-screen">
                    <span className="text-xl text-gray-500">No user yet ...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`${userCreating ? 'overflow-hidden' : ''}`}>
            {userCreating && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <CreateUser changeCreate={changeCreate} />
                </div>
            )}
            <div className='flex my-4 justify-end mx-10'>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
                    onClick={() => changeCreate(true)} 
                >
                    Create User
                </button>
            </div>
            <div className={`max-w-7xl mx-auto p-8`}>
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">User List</h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {users.map(user => {
                        if (hasSuperAdminRole()) {
                            return <UserItem key={user.id} user={user} onEdit={onEdit} />;
                        } else if (user.role !== 'superadmin') {
                            return <UserItem key={user.id} user={user} onEdit={onEdit} />;
                        } else return null;
                    })}
                </div>
            </div>
            {userEditing && <EditUser user={userEditing} onCancel={onCancel} />} 
        </div>
    );
};


const UserItem = ({ user, onEdit }: { user: User, onEdit: (user: User) => void }) => {
    return (
        <div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={() => onEdit(user)}
            key={user.id}
        >
            <img
                src="https://i0.wp.com/static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg?ssl=1"
                alt={user.username}
                className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
        </div>
    )
}