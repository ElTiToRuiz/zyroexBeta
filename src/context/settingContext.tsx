// settingContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type SettingNotification = {
    orderNotificationEnabled: boolean;
    inventoryNotificationEnabled: boolean;
    generalNotificationEnabled: boolean;
}

type SettingSystem = {
    language: string;
    currency: string;
}

type SettingRole = {
    defaultRole: string | 'staff' | 'pending';
}

type SettingAppearance = {
    theme: 'light' | 'dark';
    businessName: string;
}

export interface Settings {
    appearance: SettingAppearance;
    notification: SettingNotification;
    role: SettingRole;
    system: SettingSystem;
}

const defaultSettings: Settings = {
    appearance: {
        theme: 'light',
        businessName: 'My Business',
    },
    notification: {
        orderNotificationEnabled: true,
        inventoryNotificationEnabled: true,
        generalNotificationEnabled: true,
    },
    role: {
        defaultRole: 'staff',
    },
    system: {
        language: 'en',
        currency: 'usd',
    },
} 

type SettingsContextType = {
    settings: Settings|undefined; 
    isInitialized: boolean;
    currencySymbol: string;
    getCurrencyChange: ({number}: {number: number}) => string;
    updateNotificationSetting: (newSettings: SettingNotification) => void;
    updateSystemSetting: (newSettings: SettingSystem) => void;
    updateRoleSetting: (newSettings: SettingRole) => void;
};

const SettingsContext = createContext<SettingsContextType| undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [currencySymbol, setCurrencySymbol] = useState<string>('$');

    useEffect(() => {
        const storedSettings = localStorage.getItem('settings');
        try {
            if (storedSettings) {
                setSettings(JSON.parse(storedSettings));
            } else {
                setSettings(defaultSettings);
            }
        } catch (error) {
            console.error("Failed to parse settings:", error);
            setSettings(defaultSettings);
        } finally {
            setIsInitialized(true); // Marca como inicializado
        }
    }, []);

    useEffect(() => {
        if (isInitialized && settings) {
            localStorage.setItem('settings', JSON.stringify(settings));
            console.log('Settings updated');
        }
    }, [settings, isInitialized]);

    useEffect(() => {
        if (settings) {
            getCurrencySymbol();
        }
    }, [settings]);

    const updateNotificationSetting = (newSettings: Partial<Settings['notification']>) => {
        setSettings((prev) => ({
            ...prev!,
            notification: {
                ...prev!.notification,
                ...newSettings,
            },
        }));
    };

    const updateSystemSetting = (newSettings: Partial<Settings['system']>) =>{
        setSettings((prev) => ({
            ...prev!,
            system: {
                ...prev!.system,
                ...newSettings,
            },
        }));
    }

    const updateRoleSetting = (newSettings: Partial<Settings['role']>) =>{
        setSettings((prev) => ({
            ...prev!,
            role: {
                ...prev!.role,
                ...newSettings,
            },
        }));
    }

    if (!settings) {
        return <div>Loading...</div>;
    }
    const getCurrencySymbol = () => {
        switch (settings.system.currency) {
            case 'usd':
                setCurrencySymbol('$');
                break;
            case 'eur':
                setCurrencySymbol('€');
                break;
            case 'gbp':
                setCurrencySymbol('£');
                break;
            default:
                setCurrencySymbol('$');
                break;
        }
    }

    const getCurrencyChange = ({number}:{number:number}) => {
        const newText = currencySymbol === '€' ? 
            `${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} ${currencySymbol}` : 
            `${currencySymbol}${number.toFixed(2)}`;
        return newText;

    }

    return (
        <SettingsContext.Provider value={{ settings, currencySymbol, isInitialized, getCurrencyChange, updateNotificationSetting, updateSystemSetting, updateRoleSetting }}>
            {children}
        </SettingsContext.Provider>
    );
};



export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
