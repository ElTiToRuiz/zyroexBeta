import { useAuthUser } from "../../context/authContext";
import { Error } from "../main/Error";


export const PendingUserDashboard = () => {
    const { authUser, logout } = useAuthUser();
    const adminContact = "superadmin@superadmin.com"
	if (!authUser) {
        return <Error message="You must be logged in to access your profile." id="auth-error-001" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl space-y-6">
                <h1 className="text-3xl font-semibold text-gray-800">Welcome, {authUser.username}!</h1>
                
                <p className="text-lg text-gray-600">
                    Your account is currently under review by an administrator. You will receive a notification once your account is approved.
                </p>
                
                {/* Status Indicator */}
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="text-yellow-600 font-medium">Status: Pending Approval</span>
                </div>
                
                <p className="text-sm text-gray-600">
                    Your access is limited until an administrator reviews and approves your account.
                </p>
                
                {/* Contact Information */}
                <p className="text-sm text-gray-600">
                    Need assistance? Contact the administrator at{' '}
                    <a href={`mailto:${adminContact}`} className="text-blue-500 hover:underline">
                        {adminContact}
                    </a>
                </p>
                
                {/* Logout Button */}
                <button 
                    onClick={logout}
                    className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};
  