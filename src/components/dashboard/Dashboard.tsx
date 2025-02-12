import { FaChartBar, FaBox, FaCogs, FaExclamationCircle, FaDollarSign, FaWarehouse, FaUser, FaUserPlus, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/authContext";
import { Error } from "../main/Error";
import { DashboardInfo } from "./DashboradMain";
import { IoIosWarning } from "react-icons/io";
import { useSettings } from "../../context/settingContext";

export const DashboardContainer = ({ dashboardInfo }: { dashboardInfo: DashboardInfo }) => {
    const navigate = useNavigate();
    const { authUser, hasAdminRole, hasSuperAdminRole } = useAuthUser();
    const { getCurrencyChange } = useSettings();

    if (!authUser) {
        return <Error message="You must be logged in to access your profile." id="auth-error-001" />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">
                    Welcome, <span className="text-blue-600">{authUser.username}</span>!
                </h1>
                <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
                    onClick={() => navigate("/configuration")}
                >
                    ⚙️ Settings
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Key Metrics Card */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">📊 Key Metrics</h2>
                    <div className="space-y-2">
                        {[
                            { icon: <FaBox className="text-blue-500" />, label: "Total Orders", value: dashboardInfo.orders },
                            { icon: <FaExclamationCircle className="text-yellow-500" />, label: "Pending Orders", value: dashboardInfo.pendingOrders },
                            { icon: <FaChartBar className="text-green-500" />, label: "Completed Orders", value: dashboardInfo.completedOrders },
                            hasSuperAdminRole() && { icon: <FaDollarSign className="text-green-600" />, label: "Revenue", value: getCurrencyChange({ number: dashboardInfo.revenue }) },
                            { icon: <IoIosWarning className="text-yellow-500" />, label: "Low Stock Alert", value: dashboardInfo.noStockAlert },
                            { icon: <FaExclamationCircle className="text-red-500" />, label: "No Stock Alerts", value: dashboardInfo.noStockAlert },
                            hasSuperAdminRole() && { icon: <FaUser className="text-blue-600" />, label: "Total Users", value: dashboardInfo.totalUsers },
                            hasSuperAdminRole() && { icon: <FaUserPlus className="text-blue-600" />, label: "Pending Users", value: dashboardInfo.pendingUsers }
                        ].filter(Boolean).map((item, index) => item && (
                            <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                                <span className="text-gray-900 font-semibold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">📅 Recent Activity</h2>
                    <ul className="space-y-3">
                        {dashboardInfo.recentActivities.map((activity, index) => (
                            <li key={index} className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                                {activity}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">⚡ Quick Actions</h2>
                    <div className="space-y-4">
                        {[
                            { icon: <FaWarehouse />, label: hasAdminRole() ? "Manage Inventory" : "View Inventory", route: "/inventory" },
                            { icon: <FaBox />, label: hasAdminRole() ? "View Orders" : "My Orders", route: "/orders" },
                            { icon: <FaChartBar />, label: "View Reports", route: "/statistics" },
                            hasAdminRole() && { icon: <FaUsers />, label: "Manage Users", route: "/users" },
                            { icon: <FaCogs />, label: "Configuration", route: "/configuration" }
                        ].filter(Boolean).map((action, index) => action && (
                            <button 
                                key={index}
                                className="w-full flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                                onClick={() => navigate(action.route)}
                            >
                                {action.icon}
                                <span>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Admin-Specific Dashboard */}
            {hasAdminRole() && (
                <div className="mt-8 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">🔹 Admin Dashboard</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Total Revenue", value: `$${dashboardInfo.revenue.toFixed(2)}` },
                            { label: "Orders Last Week", value: dashboardInfo.ordersLastWeek },
                            { label: "Orders Last Day", value: dashboardInfo.ordersLastDay },
                            { label: "Inventory Alerts", value: `${dashboardInfo.lowStockAlert + dashboardInfo.noStockAlert} items`, color: "text-red-500" }
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.label}</span>
                                <span className={`font-semibold ${item.color || "text-gray-900"}`}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
