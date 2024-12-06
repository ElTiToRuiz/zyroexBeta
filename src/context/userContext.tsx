import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../utils/types';
import { allUsers } from '../utils/data/usersData';

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


    // Función para obtener todos los usuarios
    const fetchUsers = async () => { 
        try {
            const response = allUsers;
            setUsers(response);
            setLoading(false);
        } catch (error) { 
            setError('Error fetching users');
            setLoading(false);
        }
    }

    const updateUser = async (newUser: User) => {
        try {
            const updatedUsers = users.map(user => user.id === newUser.id ? newUser : user);
            setUsers(updatedUsers);
        } catch (error) {
            alert('Error updating user');
        } 
    }

    const createNewUser = async (newUser: User) => {
        try {
            const newUsers = [...users, newUser];
            setUsers(newUsers);
        } catch (error) {
            alert('Error creating user');
        }
    }

    const deleteUser = async (user: User) => {
        try {
            const newUsers = users.filter(u => u.id !== user.id);
            setUsers(newUsers);
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
