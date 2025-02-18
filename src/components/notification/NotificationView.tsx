import { notifications } from '../../utils/data/notificationData';
import { parseDateToLocal } from '../authentication/ProfileContainer';
import { motion } from 'framer-motion';

const notificationColor = (priority: string) => {
    switch (priority) {
        case 'low':
            return 'text-green-500';
        case 'medium':
            return 'text-yellow-500';
        case 'high':
            return 'text-red-500';
        default:
            return 'text-gray-700';
    }
}
const fixPriotity = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export const NotificationContainer = () => {

    return (
      <div className="p-6">
       <header className="mb-8 text-center">
            <motion.h1
                className="text-4xl font-extrabold flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span role="img" aria-label="bell" className="mr-2">
                    🔔
                </span>
                Notification Center
            </motion.h1>
            <motion.h2
                className="text-xl mt-2 text-gray-700 flex items-center justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <span role="img" aria-label="inbox" className="mr-2">
                    📥
                </span>
                Inbox
            </motion.h2>
        </header>
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                    <tr className='text-center'>
                        <th className="px-6 py-3 text-xs font-medium text-black-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-black-500 uppercase tracking-wider">
							Message
						</th>
						<th className="px-6 py-3 text-xs font-medium text-black-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-black-500 uppercase tracking-wider">
                            Date
                        </th>
						<th className="px-6 py-3 text-xs font-medium text-black-500 uppercase tracking-wider">
                           Priority
						</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification, index) => (
						<tr key={index} className={`border-t text-center ${notification.isRead ? 'bg-gray-200 opacity-50' : 'bg-white '}`}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[150px]">{notification.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-[250px]">{notification.message}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 max-w-[100px]">{notification.type}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{parseDateToLocal(notification.createdAt)}</td>
                            <td className={`px-6 py-4 text-sm border-t font-bold ${notification.priority && notificationColor(notification.priority)}`}>{notification.priority && fixPriotity(notification.priority)}</td>
                        </tr>
					))}
                </tbody>
            </table>
        </div>
      </div>
    );
};


