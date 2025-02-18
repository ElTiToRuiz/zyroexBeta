import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "../../context/settingContext";

export const RoleManagement = () => {
  	const { settings, isInitialized, updateRoleSetting } = useSettings();

  	// Handle no settings or not initialized
  	if (!settings) return null;
 	if (!isInitialized) {
		return (
			<div className="flex items-center justify-center py-10">
				<svg
					className="animate-spin h-8 w-8 text-indigo-600"
					viewBox="0 0 24 24"
				>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
					fill="none"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8v8H4z"
				/>
				</svg>
				<span className="ml-3 text-gray-600">Loading Role Settings...</span>
			</div>
		);
	}

	// Local state for the default role
	const [defaultRole, setDefaultRole] = useState<string>(
		settings.role.defaultRole
	);

	useEffect(() => {
		setDefaultRole(settings.role.defaultRole);
	}, [settings]);

  // Handle changes in the role dropdown
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		const newSettings = {defaultRole: name === "defaultRole" ? value : defaultRole,};
		if (name === "defaultRole") setDefaultRole(value);
		updateRoleSetting(newSettings);
	};

	return (
		<motion.div
			// Subtle fade/slide on mount
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="max-w-4xl mx-auto p-6 bg-white rounded-md space-y-6"
		>
			{/* Title and Description */}
			<div>
				<h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
				Role Management
				</h2>
				<p className="text-gray-600 text-sm">
				Assign a default role for newly registered users. Adjust role-based
				permissions as needed to maintain proper access levels.
				</p>
			</div>

			{/* Default Role Selection */}
			<div>
				<label
				htmlFor="role"
				className="block text-lg font-medium text-gray-700 mb-2"
				>
				Default Role for New Users
				</label>
				<select
				id="role"
				name="defaultRole"
				value={defaultRole}
				onChange={onChange}
				className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm 
							focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
							hover:border-indigo-300 transition duration-200 ease-in-out"
				>
				<option value="staff">Staff</option>
				<option value="pending">Pending</option>
				{/* Add more roles as needed */}
				</select>
			</div>
		</motion.div>
	);
};
