import { createContext, useContext, useEffect, useState } from "react";
import { useAuthUser, User } from "./authContext";
import { socket } from "../services/sockets/socket";
import { mainEndpoint } from "../utils/endpoints";

export type Notification = {
    id: string;
    title: string;
    message: string;
    type: 'Order Update' | 'System Alert' | 'Reminder' | 'Announcement' | 'Performance' | 'Inventory' | string;
    createdAt: Date;
    isRead: boolean;
    user: User | null;
    priority?: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
    notifications: Notification[];
    markRead: (a: Notification) => void;
    deleteNotification: (a: Notification) => void;
}
const NotificationContext = createContext< NotificationContextType| undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const {authUser, hasAdminRole } = useAuthUser();

	useEffect(() => {
        (async () => {
           await fetchNotifications();
        })();

	}, []);

    const fetchNotifications = async () => {
        const length = 30;
        try {
            const endPoint = hasAdminRole() ? 
                `${mainEndpoint}notifications/admin/${length}` : 
                `${mainEndpoint}notifications/user/${authUser?.id}/${length}`;
            const response = await fetch(endPoint);
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            setNotifications([])
            console.log('Error al obtener las notificaciones:', error);
        }   
    }

    const handleNewNotification = (notification: Notification) => {
        console.log('notification', notification);
        setNotifications([notification, ...notifications]);
    }

	useEffect(() => {
		const handleNewNotificationEvent = (notification: Notification) => handleNewNotification(notification); 
		socket.on('new-notification', handleNewNotificationEvent)
        return () => {
            socket.off('new-notification', handleNewNotificationEvent);
        }
	}, [notifications]);

    const markRead = (notification: Notification) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === notification.id ? { ...notif, isRead: !notif.isRead } : notif
            )
        );
        localStorage.setItem('notifications', JSON.stringify(notifications.map((notif) => notif.id === notification.id ? { ...notif, isRead: !notif.isRead } : notif)));
    }; 

    const deleteNotification = (notification: Notification) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== notification.id));
        localStorage.setItem('notifications', JSON.stringify(notifications.filter((notif) => notif.id !== notification.id)));
    };

    return (
        <NotificationContext.Provider value={{notifications, markRead, deleteNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () : NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
