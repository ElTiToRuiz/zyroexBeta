import { useState } from "react";
import { motion } from "framer-motion";
import { Support } from "../support/Support";
import { useAuthUser } from "../../context/authContext";
import { Error } from "../main/Error";
import { EditProfile } from "./EditProfile";

export const parseDateToLocal = (t:Date) => {
    return new Date(t).toUTCString();
};

export const ProfileContainer = () => {
    const { authUser, logout } = useAuthUser();
    const [openSupport, setOpenSupport] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    if (!authUser) {
        return <Error message="You must be logged in to access your profile." id="auth-error-001" />;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-300"
        >
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Profile Information</h2>

            <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600">
                    {authUser.username.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mt-4">{authUser.username}</h3>
                <p className="text-lg text-gray-500 mt-1">Last Login: {parseDateToLocal(authUser.lastLogin)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">User Details</h3>
                    {[
                        { label: "Email", value: authUser.email },
                        { label: "Role", value: authUser.role },
                        { label: "User ID", value: authUser.id }
                    ].map((info, index) => (
                        <div key={index} className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-500">{info.label}</h4>
                            <p className="text-xl text-gray-900 font-medium mt-1">{info.value}</p>
                        </div>
                    ))}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => setOpenEdit(true)}
                            className="w-1/2 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={logout}
                            className="w-1/2 py-3 text-lg font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 h-56">
                    <p className="text-gray-500 text-center">Additional widgets or information can go here.</p>
                </div>
            </div>

            <hr className="border-gray-300 my-10" />

            <div className="text-gray-700 mb-8 text-center">
                <h3 className="text-xl font-semibold">Need Assistance?</h3>
                <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                    Reach out to our support team if you need help with your profile.
                </p>
            </div>

            <button
                onClick={() => setOpenSupport(true)}
                className="w-full py-3 text-lg font-medium text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
                Contact Support
            </button>

            {openEdit && <EditProfile user={authUser} close={() => setOpenEdit(false)} />}
            {openSupport && <Support close={() => setOpenSupport(false)} />}
        </motion.div>
    );
};
