import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../utils/types';

const DEMO_USER : User = {
	id: 'user-id',
	username: 'test-user',
	email: 'testuser@testing',
	role: 'superadmin',
	lastLogin: new Date(),
}

interface AuthFormValues {
    username?: string; // Optional for login form
    password: string;
    email: string;
}
// Tipo del contexto
type AuthContextType = {
    authUser: User | null;
    isAuth: boolean;
    loading: boolean;
    error: string;
    formValues: AuthFormValues;
    isSubmitting: boolean;
    hasAdminRole: () => boolean;
    hasSuperAdminRole: () => boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (a: string) => Promise<void>;
    logout: () => void;
};


// Proveedor del contexto
type AuthProviderProps = {
    children: ReactNode;
};

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAuthUser = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthUser debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [formValues, setFormValues] = useState<AuthFormValues>({ username: '', email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();
    const hasAdminRole = () => ["admin", "superadmin"].includes(authUser?.role ?? '');
    const hasSuperAdminRole = () => authUser?.role === "superadmin";

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = DEMO_USER; 
                setAuthUser(user as User);
                setIsAuth(true);
            } catch (error) {
                setAuthUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (type:string) => {
        const { username, password, email } = formValues;

        // Basic validation
        if (!email || !password || (type === 'register' && !username)) {
            setError('All fields are required');
            return;
        }

        setIsSubmitting(true); // Set submitting state

        let user;
        try {
            if (type === 'login') {
                // Call login API
                user = DEMO_USER;
            } else {
                // Call register API
                if (!username) {
                    setError('Username is required');
                    return;
                }
                user = DEMO_USER;
            }

            // Set user and auth state on success
            setAuthUser(user);
            console.log(user);
            setIsAuth(true);
            localStorage.clear();
            navigate('/login'); 
            window.location.reload();
            
            // Reset form and error on success
            setFormValues({ username: '', password: '', email: '' });
            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} successful`);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message); // Set error message received from API response
            } else {
                setError(String(err)); // Convert unknown error to string
            }
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    const logout = async () => { 
        setAuthUser(null);
        setIsAuth(false);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ authUser, loading, error, isAuth, formValues, isSubmitting, hasAdminRole, hasSuperAdminRole, handleChange, handleSubmit, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
