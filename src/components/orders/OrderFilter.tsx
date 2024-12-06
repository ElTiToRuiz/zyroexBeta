import { useOrders } from "../../context/orderContext";


export const OrderFilters = () => {
    const { urgent, setStatus, setUrgent } = useOrders();
    // Handle status change
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    // Handle urgent filter toggle
    const handleUrgentToggle = () => {
        setUrgent(!urgent);
    }

    return (
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
            {/* Status Filter */}
            <div className="flex items-center space-x-3">
                <label htmlFor="status" className="font-medium text-gray-700">Filter by status:</label>
                <select
                    id="status"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    onChange={handleStatusChange}
                    aria-label="Filter orders by status"
                >
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Urgent Filter */}
            <div className="flex items-center space-x-3">
                <label htmlFor="urgent-toggle" className="font-medium text-gray-700">Show Urgent Orders:</label>
                <div className="relative">
                    <input
                        id="urgent-toggle"
                        type="checkbox"
                        className="sr-only"
                        checked={urgent}
                        onChange={handleUrgentToggle}
                        aria-label="Toggle urgent orders"
                    />
                    <div
                        className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ${urgent ? 'bg-indigo-600' : 'bg-gray-300'}`}
                        onClick={handleUrgentToggle}
                    >
                        <div
                            className={`w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${urgent ? 'translate-x-6' : 'translate-x-0'}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
