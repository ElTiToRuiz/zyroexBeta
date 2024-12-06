import { useEffect, useState } from "react";
import { useSettings } from "../../context/settingContext";

export const RoleManagement = () => {
	const { settings, isInitialized, updateRoleSetting } = useSettings();
    if (!settings) return null;
    if(!isInitialized) return <div>Loading...</div>;
	const [defaultRole, setDefaultRole] = useState<string>(settings.role.defaultRole);
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSettings = {
			defaultRole: e.target.name === 'defaultRole' ? e.target.value : defaultRole,
		}
		if(e.target.name === 'defaultRole') setDefaultRole(e.target.value);
		updateRoleSetting(newSettings);
	}
	useEffect(() => {
		setDefaultRole(settings.role.defaultRole);
	}, [ settings ]);
	
	return (
		<div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Role Management</h2>

			<div className="space-y-6">
				{/* Default Role for New Users */}
				<div>
					<label htmlFor="role" className="block text-lg font-medium text-gray-700">Default Role for New Users</label>
					<select
						name="defaultRole"
						value={defaultRole}
						id="role"
						className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
						onChange={onChange}
					>
						<option value="staff">Staff</option>
						<option value="pending">Pending</option>
					</select>
				</div>
			</div>
		</div>
	)
}