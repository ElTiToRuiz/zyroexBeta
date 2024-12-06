// NotifiacationPreferences.tsx
import { useEffect, useState } from 'react';
import { useSettings } from '../../context/settingContext';

export const NotificationPreferences = () => {
    const { settings, isInitialized, updateNotificationSetting } = useSettings();
    if (!settings) return null;
    if(!isInitialized) return <div>Loading...</div>;
    const [orders, setOrders] = useState<boolean>(settings.notification.orderNotificationEnabled);
    const [inventory, setInventory] = useState<boolean>(settings.notification.inventoryNotificationEnabled);
    const [announcements, setAnnouncements] = useState<boolean>(settings.notification.generalNotificationEnabled);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        const newSettings = {
            orderNotificationEnabled: name === 'orders' ? checked : orders,
            inventoryNotificationEnabled: name === 'inventory' ? checked : inventory,
            generalNotificationEnabled: name === 'announcements' ? checked : announcements,
        };

        if (name === 'orders') setOrders(checked);
        if (name === 'inventory') setInventory(checked);
        if (name === 'announcements') setAnnouncements(checked);

        updateNotificationSetting(newSettings);
    };

    useEffect(() => {
        setOrders(settings.notification.orderNotificationEnabled);
        setInventory(settings.notification.inventoryNotificationEnabled);
        setAnnouncements(settings.notification.generalNotificationEnabled);
    }, [settings]);

    return (
        <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Notification Preferences</h2>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <input
                        name="orders"
                        type="checkbox"
                        id="orders"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        checked={orders}
                    />
                    <label htmlFor="orders" className="text-lg text-gray-700 font-medium">Orders</label>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        name="inventory"
                        type="checkbox"
                        id="inventory"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        checked={inventory}
                    />
                    <label htmlFor="inventory" className="text-lg text-gray-700 font-medium">Inventory Updates</label>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        name="announcements"
                        type="checkbox"
                        id="announcements"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        checked={announcements}
                    />
                    <label htmlFor="announcements" className="text-lg text-gray-700 font-medium">General Announcements</label>
                </div>
            </div>
        </div>
    );
};
