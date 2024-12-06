import { useState } from "react";
import { Support } from "../support/Support";
import { useAuthUser } from "../../context/authContext";
import { Error } from "../main/Error";
import { EditProfile } from "./EditProfile";

export const parseDateToLocal = (t: Date) => {
    // Create a Date object from the GMT date string (ISO format)
    const date = new Date(t);

    // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return date.toUTCString();
}

export const ProfileContainer = () => {
    const {authUser, logout} = useAuthUser();
    const [openSupport, setOpenSupport] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    
    if (!authUser) {
        return <Error message="You must be logged in to access your profile." id="auth-error-001" />;
    }
    
    const handleEditProfile = () => {
        setOpenEdit(true);
        console.log("Edit Profile");
    };

    const handleSupportClick = () => {
        setOpenSupport(true);
        console.log("Support button clicked");
    };

    return (
        <div className="mt-2 max-w-5xl mx-auto p-10 bg-white shadow-2xl rounded-3xl border border-gray-300">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10">Profile Information</h2>

            {/* Profile Header */}
            <div className="flex items-center mb-10 space-x-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                    {authUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-900">{authUser.username}</h3>
                    <p className="text-lg text-gray-500 mt-1">{parseDateToLocal(authUser.lastLogin)}</p>
                </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side: User Details */}

                <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">User Details</h3>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-500">Email</h3>
                        <p className="text-2xl text-gray-900 font-medium mt-2">{authUser.email}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-500">Role</h3>
                        <p className="text-2xl text-gray-900 font-medium mt-2">{authUser.role}</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-500">User ID</h3>
                        <p className="text-2xl text-gray-900 font-medium mt-2">{authUser.id}</p>
                    </div>
                
                {/* Edit and Logout Buttons */}
                <div className="flex flex-row place-items-center gap-4 mt-10">
                    <button
                        onClick={handleEditProfile}
                        className="text-lg w-[300px] h-[50px] font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition-transform transform hover:scale-105"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={logout}
                        className="text-lg w-[300px] h-[50px] font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 transition-transform transform hover:scale-105"
                    >
                        Log Out
                    </button>
                </div>
                </div>

                {/* Right Side: Empty for Future Extensions */}
                <div className="flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 h-64">
                    <p className="text-gray-500">This space can be used for additional widgets or information.</p>
                </div>
            </div>

            {/* Divider */}
            <div className="my-10">
                <hr className="border-gray-300" />
            </div>

            {/* Notes Section */}
            <div className="text-gray-700 mb-8">
                <h3 className="text-xl font-semibold">Additional Notes</h3>
                <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                    For any further queries or to update your profile details, please reach out to our support team.
                </p>
            </div>

            {/* Support Button */}
            <button
                onClick={handleSupportClick}
                className="w-full px-6 py-4 text-lg font-medium text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-400 transition-transform transform hover:scale-105"
            >
                Contact Support
            </button>
            {openEdit && <EditProfile user={authUser} close={()=>setOpenEdit(false)}/>}
            {openSupport && <Support  close={()=>setOpenSupport(false)}/>}
        </div>
    );
};
