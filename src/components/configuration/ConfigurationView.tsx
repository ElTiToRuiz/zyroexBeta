import { useState } from 'react';
import { NotificationPreferences } from './NotificationPreferences';
import { SystemSettings } from './SystemSetting';
import { RoleManagement } from './RoleManagement';
import { AppearanceSettings } from './AppearanceSettings';
import { ThirdPartyConnection } from './ThirdPartyConnection';
import { useAuthUser } from '../../context/authContext';


export const ConfigurationPage = () => {
    const {hasSuperAdminRole} = useAuthUser();
    const [activeTab, setActiveTab] = useState<string>('notifications');

    const tabs = hasSuperAdminRole() ? 
        ['notifications', 'systemPreferences', 'roleManagement', 'appearance', 'systemIntegrations'] : 
        ['notifications', 'systemPreferences', 'appearance'];

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Tab Navigation */}
            <div className="tabs mb-8 flex space-x-6 border-b border-gray-200">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-button py-2 px-4 text-lg font-semibold text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none 
                        ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'hover:text-blue-500'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                    </button>
                ))}
            </div>

            {/* Tab Content with Transition */}
            <div className="tab-content mt-6 transition-all duration-300 ease-in-out">
                {activeTab === 'notifications' && <NotificationPreferences />}
                {activeTab === 'systemPreferences' && <SystemSettings />}
                {activeTab === 'roleManagement' && hasSuperAdminRole() && <RoleManagement />}
                {activeTab === 'appearance' && <AppearanceSettings />}
                {activeTab === 'systemIntegrations' && hasSuperAdminRole() &&  <ThirdPartyConnection />}
            </div>

        </div>
    );
};
