import { useEffect, useState } from "react";
import { useSettings } from "../../context/settingContext";
import { useAuthUser } from "../../context/authContext";

export const SystemSettings = () => {
    const {hasSuperAdminRole} = useAuthUser()
    const { settings, isInitialized, updateSystemSetting } = useSettings();
    if (!settings) return null;
    if(!isInitialized) return <div>Loading...</div>;
    const [language, setLanguage] = useState<string>(settings.system.language);
    const [currency, setCurrency] = useState<string>(settings.system.currency);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSettings = {
            language: e.target.name === 'language' ? e.target.value : language,
            currency: e.target.name === 'currency' ? e.target.value : currency,
        }
        updateSystemSetting(newSettings);
        if (e.target.name === 'language') setLanguage(e.target.value);
        if (e.target.name === 'currency') setCurrency(e.target.value);
    }

    useEffect(() => {
        setLanguage(settings.system.language);
        setCurrency(settings.system.currency);
    }, [ settings ]);

    return (
        <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">System Settings</h2>

            <div className="space-y-6">
                {/* Language Selection */}
                <div>
                    <label htmlFor="language" className="block text-lg font-medium text-gray-700 mb-2">Language</label>
                    <select
                        id="language"
                        className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition duration-200 ease-in-out"
                        onChange={onChange}
                        value={language}
                        name="language"
                    >
                        <option value="en">English</option>
                        <option value="es" disabled >Spanish (Comming Soon)</option>
                        <option value="fr" disabled >French (Comming Soon)</option>
                    </select>
                </div>

                {/* Time Zone Selection */}
                {/* <div>
                    <label htmlFor="timezone" className="block text-lg font-medium text-gray-700 mb-2">Time Zone</label>
                    <select
                    id="timezone"
                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition duration-200 ease-in-out"
                    // onChange={onChange}
                    >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Standard Time</option>
                    <option value="PST">Pacific Standard Time</option>
                    </select>
                </div> */}

                {/* Currency Selection */}
                {
                    hasSuperAdminRole() && <div>
                        <label htmlFor="currency" className="block text-lg font-medium text-gray-700 mb-2">Currency</label>
                        <select
                            id="currency"
                            className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition duration-200 ease-in-out"
                            value={currency}
                            onChange={onChange}
                            name="currency"
                        >
                            <option value="usd">United States Dollar (USD)</option>
                            <option value="eur">Euro (EUR)</option>
                            <option value="gbp">British Pound (GBP)</option>
                        </select>
                    </div>
                }
            </div>
        </div>
    );
}
