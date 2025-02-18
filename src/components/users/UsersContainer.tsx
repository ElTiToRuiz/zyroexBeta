import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { Loading } from "../main/Loading";
import { CreateUser } from "./UserCreate";
import { EditUser } from "./UserEdit";
import { useAuthUser } from "../../context/authContext";
import { User } from "../../utils/types";
import { motion, AnimatePresence } from "framer-motion";

export const UserContainer = () => {
    const { users, loading, error } = useUserContext();
    const { hasSuperAdminRole } = useAuthUser();
    const [userCreating, setUserCreating] = useState<boolean>(false);
    const [userEditing, setIsEditing] = useState<User | null>(null);

    const onEdit = (user: User) => setIsEditing(user);
    const onCancel = () => setIsEditing(null);
    const changeCreate = (b: boolean) => {
        setUserCreating(b);
    };

    useEffect(() => {
        document.body.style.overflow = userCreating ? "hidden" : "auto";
    }, [userCreating]);

    if (loading) {
        return <Loading loading={loading} loadingmsg="Loading users" error={error} />;
    }

    return (
        <div className={`${userCreating ? "overflow-hidden" : ""}`}>
            {/* Create User Modal */}
            <AnimatePresence>
                {userCreating && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CreateUser changeCreate={changeCreate} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Action Bar */}
            <div className="flex justify-center md:justify-end md:mx-10 my-4 mb-6">
                <motion.button
                    onClick={() => changeCreate(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg"
                >
                    Create User
                </motion.button>
            </div>

            {/* Container Header */}
            <motion.h1
                className="text-4xl font-bold text-center text-gray-800 mt-4 md:mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                User Directory
            </motion.h1>

            {/* User Grid */}
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {users &&
                        users.map((user) => {
                            if (hasSuperAdminRole() || user.role !== "superadmin") {
                                return (
                                    <UserItem key={user.id} user={user} onEdit={onEdit} />
                                );
                            }
                            return null;
                        })}
                </div>
            </div>

            {/* Edit User Modal */}
            <AnimatePresence>
                {userEditing && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <EditUser user={userEditing} onCancel={onCancel} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const UserItem = ({
    user,
    onEdit,
}: {
    user: User;
    onEdit: (user: User) => void;
}) => {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => onEdit(user)}
            whileHover={{ scale: 1.03 }}
        >
            <img
                src="https://i0.wp.com/static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg?ssl=1"
                alt={user.username}
                className="w-24 h-24 rounded-full mb-4 object-cover"
                loading="lazy"
            />
            <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
        </motion.div>
    );
};
