// NotificationPopup.tsx
import { IoIosNotifications } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
// import { useNotification } from "../../context/notificationContext";
// import { useEffect, useState } from "react";

export const NotificationPopup = () => {
    // const [number, setNumber] = useState<number>(0);
    // const { notifications } = useNotification();
    const navigate = useNavigate();
    
    // useEffect(() => { 
    //     const unreadCount = notifications.filter((n) => !n.isRead).length;
    //     setNumber(unreadCount);
    // }, [notifications]);

    if (useLocation().pathname === '/notifications') {
        return null;
    }

    return (
        <div 
            className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            onClick={()=>navigate('/notifications')}
            role="alert" // Accessibility: Define it as an alert
            aria-live="assertive" // Ensure screen readers announce it immediately
        >
            <IoIosNotifications className="text-2xl" />
            {/* <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white w-4 h-4 rounded-full flex justify-center items-center text-sm p-0.5">
                {number}
            </span> */}
        </div>
    );
};
