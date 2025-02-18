import { useEffect, useState } from "react";
import { TeamFormModal } from "./TeamModal";
import { TeamDetails } from "./TeamDetails";
import { useTeams } from "../../context/teamContext";
import { useAuthUser } from "../../context/authContext";
import { FaPen } from "react-icons/fa";
import { Team } from "../../utils/types";
import { motion, AnimatePresence } from "framer-motion";

type TeamCache = {
    team: Team | null;
    view: boolean;
};

export const TeamContainer = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);

    const { teams, setActiveTeam } = useTeams();
    const { hasAdminRole } = useAuthUser();

    useEffect(() => {
        const existTeam: TeamCache = JSON.parse(localStorage.getItem("viewTeam") || "{}");
        if (existTeam?.team) {
            setActiveTeam(existTeam.team);
            setSelectedTeam(existTeam.view);
        }
    }, [setActiveTeam]);

    const handleCreateTeam = () => {
        setSelectedTeam(false);
        setModalOpen(true);
    };

    const handleViewTeam = (team: Team) => {
        localStorage.setItem("viewTeam", JSON.stringify({ team, view: true }));
        setActiveTeam(team);
        setSelectedTeam(true);
    };

    const closeModal = () => {
        localStorage.setItem("viewTeam", JSON.stringify({ team: null, view: false }));
        setModalOpen(false);
        setSelectedTeam(false);
        setActiveTeam(null);
    };

    const handleEditing = (team: Team) => {
        setTeamToEdit(team);
        setActiveTeam(team);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6">
            {/* Header */}
            {!selectedTeam && (
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {hasAdminRole() ? "Teams" : "Your Teams"}
                    </h1>
                    {hasAdminRole() && (
                        <button
                            onClick={handleCreateTeam}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-2xl transition"
                        >
                            Create Team
                        </button>
                    )}
                </div>
            )}

            {/* Teams List / Details */}
            {!selectedTeam ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teams.map((team) => (
                        <motion.div
                            key={team.id}
                            className="relative bg-white rounded-xl shadow-lg p-6 cursor-pointer group overflow-hidden"
                            whileHover={{ scale: 1.03 }}
                            onClick={() => handleViewTeam(team)}
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700">
                                    {team.name}
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">
                                    {team.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-4 italic">
                                    Click to view details
                                </p>
                            </div>
                            {hasAdminRole() && (
                                <motion.div
                                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditing(team);
                                    }}
                                >
                                    <FaPen className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            ) : (
                <TeamDetails goBack={closeModal} />
            )}

            {/* Modal for Creating Team */}
            <AnimatePresence>
                {isModalOpen && !selectedTeam && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TeamFormModal team={null} closeModal={closeModal} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal for Editing Team */}
            <AnimatePresence>
                {teamToEdit && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TeamFormModal
                            team={teamToEdit}
                            closeModal={() => {
                                setTeamToEdit(null);
                            }}
                            goBack={closeModal}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
