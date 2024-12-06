import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from './authContext';
import { fetchCreateUser, fetchDeleteUser, fetchGetAllUser, fetchUpdateUser } from '../services/fetch/fetchUsers';
import { socket } from '../services/sockets/socket';
import { handleDeleteUser, handleNewUser, handleUpdateUser } from '../services/sockets/userSocket';
interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
    updateUser: (updatedUser: User) => void;
    createNewUser: (newUser: User) => void;
    deleteUser: (user: User) => void; 
}

// Creamos el contexto con un valor inicial vacío
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor de contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const handleNewUserEvent = (newUser: User) => handleNewUser({user: newUser, userList: users, setUserList: setUsers});
        const handleUpdateUserEvent = (updatedUser: User) => handleUpdateUser({user: updatedUser, userList: users, setUserList: setUsers});
        const handleDeleteUserEvent = (deletedUser: User) => handleDeleteUser({user: deletedUser, userList: users, setUserList: setUsers});
        socket.on('new-user', handleNewUserEvent);
        socket.on('update-user', handleUpdateUserEvent);
        socket.on('delete-user', handleDeleteUserEvent);
        return () => {
            socket.off('new-user', handleNewUserEvent);
            socket.off('update-user', handleUpdateUserEvent);
            socket.off('delete-user', handleDeleteUserEvent);
        }
    }, [users]);

    // Función para obtener todos los usuarios
    const fetchUsers = async () => { 
        try {
            const response = await fetchGetAllUser();
            setUsers(response);
            setLoading(false);
        } catch (error) { 
            setError('Error fetching users');
            setLoading(false);
        }
    }

    const updateUser = async (newUser: User) => {
        try {
            await fetchUpdateUser(newUser);
        } catch (error) {
            alert('Error updating user');
        } 
    }

    const createNewUser = async (newUser: User) => {
        try {
            await fetchCreateUser(newUser);
        } catch (error) {
            alert('Error creating user');
        }
    }

    const deleteUser = async (user: User) => {
        try {
            await fetchDeleteUser(user);
        } catch (error) {
            alert('Error deleting user');
        }
    }

    return (
        <UserContext.Provider value={{ users, loading, error, updateUser, createNewUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
