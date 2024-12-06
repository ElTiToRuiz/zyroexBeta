

export const AppearanceSettings = () => (
    <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Themes & Appearance</h2>
			<div className="space-y-6">
				{/* Color Scheme Selection */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
				<label htmlFor="colorScheme" className="block text-lg font-medium text-gray-700 sm:w-1/4">
					Color Scheme
				</label>
				<select
					id="colorScheme"
					className="block w-full sm:w-2/3 mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
					// onChange={onChange}
				>
					<option value="light">Light</option>
					<option value="dark" className="text-gray-400" disabled>Dark (Coming Soon)</option>
					</select>		
				</div>
				{/* Logo Upload */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
				<label htmlFor="logo" className="block text-lg font-medium text-gray-700 sm:w-1/4">
					Upload Logo
				</label>
				<input
					type="file"
					id="logo"
					className="block w-full sm:w-2/3 mt-1 p-3 border border-gray-300 rounded-md shadow-sm file:border-gray-300 file:bg-gray-50 file:text-gray-700 file:px-4 file:py-2 file:rounded-md file:hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
					// onChange={onChange}
				/>
				</div>
		</div>
    </div>
);

