import { useEffect, useState } from "react";
import { TeamFormModal } from "./TeamModal";
import { TeamDetails } from "./TeamDetails";
import { useTeams } from "../../context/teamContext";
import { useAuthUser } from "../../context/authContext";
import { FaPen } from "react-icons/fa";
import { Team } from "../../utils/types";

type teamCache = {
    team: Team | null;
    view: boolean;
}

export const TeamContainer = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<boolean>(false);
    const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);

    const { teams, setActiveTeam } = useTeams();
    const { hasAdminRole } = useAuthUser();
    
    useEffect(() => {
        const existTeam: teamCache = JSON.parse(localStorage.getItem('viewTeam') || '{}');
        if (existTeam?.team) {
            setActiveTeam(existTeam.team);
            setSelectedTeam(existTeam.view);
        }
    }, []);

    const handleCreateTeam = () => {
        setSelectedTeam(false);
        setModalOpen(true);
    };

    const handleViewTeam = (team: Team) => {
        localStorage.setItem('viewTeam', JSON.stringify({ team, view: true }));
        setActiveTeam(team);
        setSelectedTeam(true);
    };

    const closeModal = () => {
        localStorage.setItem('viewTeam', JSON.stringify({ team: null, view: false }));
        setModalOpen(false); 
        setSelectedTeam(false);
        setActiveTeam(null); 
    };

    const handleEditing = (team: Team) => {
        setTeamToEdit(team);
        setActiveTeam(team);
    };
    
    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            {/* If a team is not being viewed, show this header */}
            {!selectedTeam && (
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">{hasAdminRole() ? 'Teams' : 'Your Teams'}</h1>
                    {hasAdminRole() && (
                        <button
                            onClick={handleCreateTeam}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Create Team
                        </button>
                    )}
                </div>
            )}

            {/* Teams list */}
            {!selectedTeam ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <div key={team.id} className="p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between relative group">
                            <div onClick={() => handleViewTeam(team)} aria-label={`View details of ${team.name}`}>
                                <h2 className="text-lg font-semibold text-gray-700">{team.name}</h2>
                                <p className="text-sm text-gray-600">{team.description}</p>
                                <p className="text-sm text-gray-400 mt-2 italic">Click to view details</p>
                            </div>
                         
                            {
                                hasAdminRole() && 
                                <div 
                                    className="m-3 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    onClick={() => handleEditing(team)}
                                >
                                    <FaPen className="w-4 h-4 text-gray-600 hover:text-gray-800 cursor-pointer transition" />
                                </div>
                            }
                        </div>
                    ))}
                </div>
            ) : (
                <TeamDetails goBack={closeModal} />
            )}

            {/* Modal for creating/editing teams */}
            {isModalOpen && !selectedTeam && (
                <TeamFormModal team={null} closeModal={closeModal} />
            )}

            {teamToEdit && <TeamFormModal team={teamToEdit} closeModal={()=>{setTeamToEdit(null)}} goBack={closeModal} />}
        </div>
    );
};
