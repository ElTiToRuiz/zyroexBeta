import { IoCloseSharp } from "react-icons/io5";
import { useTeams } from "../../context/teamContext";
import { useState } from "react";
import { Team } from "../../utils/types";
import { motion, AnimatePresence } from "framer-motion";

interface TeamFormModalProps {
    closeModal: () => void;
    goBack?: () => void;
    team: Team | null;
}

export const TeamFormModal = ({
    closeModal,
    goBack,
    team,
}: TeamFormModalProps) => {
    const { updateTeam, createTeam, deleteTeam } = useTeams();
    const [info, setInfo] = useState({
        name: team?.name || "",
        description: team?.description || "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (team) {
            updateTeam({ ...team, ...info });
        } else {
            createTeam(info.name, info.description);
        }
        closeModal();
    };

    const handleDelete = () => {
        if (!team) return;
        deleteTeam(team);
        closeModal();
        if (goBack) setTimeout(goBack, 150);
    };

    // Backdrop animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    // Modal animation variants (centered card)
    const modalVariants = {
        hidden: { scale: 0.8, y: 50, opacity: 0 },
        visible: {
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 150, damping: 20 },
        },
        exit: { scale: 0.8, y: 50, opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                onClick={closeModal}
            >
                <motion.div
                    className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                            {team ? `Edit Team: ${team.name}` : "Create New Team"}
                        </h2>
                        <button
                            onClick={closeModal}
                            className="text-white hover:text-gray-200"
                        >
                            <IoCloseSharp className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Modal Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Team Name
                            </label>
                            <input
                                type="text"
                                value={info.name}
                                onChange={(e) =>
                                    setInfo({ ...info, name: e.target.value })
                                }
                                placeholder="Enter team name"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={info.description}
                                onChange={(e) =>
                                    setInfo({ ...info, description: e.target.value })
                                }
                                placeholder="Add description"
                                rows={4}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div className="flex justify-end space-x-4">
                            {team && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                            >
                                {team ? "Update Team" : "Create Team"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
