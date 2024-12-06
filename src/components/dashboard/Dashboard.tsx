import { FaChartBar, FaBox, FaCogs, FaExclamationCircle, FaDollarSign, FaWarehouse, FaUser, FaUserPlus, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/authContext";
import { Error } from "../main/Error";
import { DashboardInfo } from "./DashboradMain";
import { IoIosWarning } from "react-icons/io";
import { useSettings } from "../../context/settingContext";

export const DashboardContainer = ({dashboardInfo}:{dashboardInfo:DashboardInfo}) => {
	
	const navigate = useNavigate();

	const { authUser, hasAdminRole, hasSuperAdminRole } = useAuthUser();
	const {getCurrencyChange} = useSettings();

	if (!authUser) {
        return <Error message="You must be logged in to access your profile." id="auth-error-001" />;
    }


	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-4xl font-bold text-gray-800 mb-8">
				Welcome, <span className="text-blue-600">{authUser.username}</span>!
			</h1>

			<div className="flex flex-wrap justify-center mb-8">
				<div className="bg-yellow-100 p-6 rounded-lg shadow-md mb-6 max-w-4xl w-full">
					<h3 className="text-xl font-semibold text-yellow-800 mb-4">
						<span className="block">Note: This is a demo version of the app.</span>
						<span className="block text-sm text-gray-700 mt-2">
							Please note that any data you enter or modify in this demo is not saved permanently. 
							Changes are temporary and will be lost once you refresh or navigate away from the page.
						</span>
						<span className="block text-sm text-gray-700 mt-2">
							Additionally, the data you see in different sections (e.g., orders, products, or user details) is not connected. 
							Each part of the app functions independently for demonstration purposes and does not reflect any real-time or synchronized data.
						</span>
						<span className="block text-sm text-gray-700 mt-2">
							For access to real-time data and full functionality, please <a href="mailto:ruizigor16@gmail.com" className="text-yellow-600 hover:underline">contact us</a>.
						</span>
						<span className="block text-sm text-gray-700 mt-2">
							As this is a demo version, there may be some bugs or issues. If you find any, please <a href="mailto:ruizigor16@gmail.com" className="text-yellow-600 hover:underline">report them</a>.
						</span>
					</h3>
				</div>
			</div>


	

			{/* Grid Layout for Cards */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Key Metrics */}
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-xl font-semibold text-gray-700 mb-4">Key Metrics</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2 text-gray-600">
								<FaBox className="text-blue-500" />
								<span>Total Orders</span>
							</div>
							<span className="text-gray-900 font-semibold">{dashboardInfo.orders}</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2 text-gray-600">
								<FaExclamationCircle className="text-yellow-500" />
								<span>Pending Orders</span>
							</div>
							<span className="text-gray-900 font-semibold">{dashboardInfo.pendingOrders}</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2 text-gray-600">
								<FaChartBar className="text-green-500" />
								<span>Completed Orders</span>
							</div>
							<span className="text-gray-900 font-semibold">{dashboardInfo.completedOrders}</span>
						</div>
						{
							hasSuperAdminRole() && <div className="flex items-center justify-between">
								<div className="flex items-center space-x-2 text-gray-600">
									<FaDollarSign className="text-green-600" />
									<span>Revenue</span>
								</div>
								<span className="text-gray-900 font-semibold">{getCurrencyChange({ number: dashboardInfo.revenue })}</span>
							</div>
						}

						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2 text-gray-600">
								<IoIosWarning className="text-yellow-500" />
								<span>Low Stock Alert</span>
							</div>
							<span className="text-gray-900 font-semibold">{dashboardInfo.noStockAlert}</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2 text-gray-600">
								<FaExclamationCircle className="text-red-500" />
								<span>No Stock Alerts</span>
							</div>
							<span className="text-gray-900 font-semibold">{dashboardInfo.noStockAlert}</span>
						</div>
						{
							hasSuperAdminRole() && <div className="flex items-center justify-between">
							<div className="flex items-center space-x-2 text-gray-600">
								<FaUser className="text-blue-600" />
								<span>Total User</span>
							</div>
							<span className="text-gray-900 font-semibold">{dashboardInfo.totalUsers}</span>
						</div>
						}
						{
							hasSuperAdminRole() && <div className="flex items-center justify-between">
								<div className="flex items-center space-x-2 text-gray-600">
									<FaUserPlus className="text-blue-600" />
									<span>Pending Users</span>
								</div>
								<span className="text-gray-900 font-semibold">{dashboardInfo.pendingUsers}</span>
							</div>
						}
					</div>
				</div>

				{/* Notifications and Recent Activity */}
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
					<ul className="space-y-3">
						{dashboardInfo.recentActivities.map((activity, index) => (
							<li
								key={index}
								className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
							>
								{activity}
							</li>
						))}
					</ul>
				</div>

				{/* Quick Actions */}
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
					<div className="space-y-4">
						<button className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
							onClick={() => navigate("/inventory")}
						>
							<FaWarehouse />
							<span>
								{hasAdminRole() ? "Manage Inventory" : "View Inventory"} 
							</span>
						</button>
						<button className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
							onClick={() => navigate("/orders")}
						>
							<FaBox />
							<span>
								{hasAdminRole() ? "View Orders" : " My Orders"}
							</span>
						</button>
						<button className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
							onClick={() => navigate("/statistics")}
						>
							<FaChartBar />
							<span>View Reports</span>
						</button>
						{hasAdminRole() && <button className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
							onClick={() => navigate("/users")}
						>
							<FaUsers />
							<span>Manage Users</span>
						</button>}
						<button className="w-full flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
							onClick={() => navigate("/configuration")}
						>
							<FaCogs />
							<span>Configuration</span>
						</button>
					</div>
				</div>
			</div>

			{/* Role-Specific Dashboard Sections */}
			<div className="mt-8">
				{hasAdminRole() && (
					<div className="bg-white p-6 rounded-xl shadow-lg">
						<h3 className="text-2xl font-semibold text-gray-700 mb-4">Admin Dashboard</h3>
						<div className="space-y-4">
							<div className="flex justify-between">
								<span>Total Revenue</span>
								<span className="font-semibold">${dashboardInfo.revenue.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Orders Last Week</span>
								<span className="font-semibold">{dashboardInfo.ordersLastWeek}</span>
							</div>
							<div className="flex justify-between">
								<span>Orders Last Day</span>
								<span className="font-semibold">{dashboardInfo.ordersLastDay}</span>
							</div>
							<div className="flex justify-between">
								<span>Inventory Alerts</span>
								<span className="font-semibold text-red-500">{dashboardInfo.lowStockAlert + dashboardInfo.noStockAlert} items</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};