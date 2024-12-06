import { IoCloseSharp } from "react-icons/io5";
import { Team, useTeams } from "../../context/teamContext";
import { useState } from "react";

interface TeamFormModalProps {
    closeModal: () => void;
    goBack?: () => void;
    team: Team | null;
}

export const TeamFormModal = ({ closeModal, goBack, team }:TeamFormModalProps) => {
    const [info, setInfo] = useState({
        name: team?.name || "",
        description: team?.description || ""
    });

    const {updateTeam, createTeam, deleteTeam} = useTeams();

    const handleSubmit = () => {
        if (team) {
            updateTeam({...team, ...info});
        } else {
            createTeam(info.name, info.description);
        }
        closeModal();
    }

    const handleDelete = () => {
        if (!team) return;
        deleteTeam(team);
        closeModal();
        goBack && setTimeout(goBack, 150);

    }

    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    <IoCloseSharp className="w-7 h-10" />
                </button>
                <h2 className="text-xl font-semibold mb-4">
                    {team ? `Edit Team: ${team.name}` : "Create New Team"}
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Team Name
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setInfo({...info, name: e.target.value})}
                            placeholder="Enter team name"
                            defaultValue={team && team.name || ""}
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            defaultValue={team && team.description || ""}
                            rows={4}
                            onChange={(e) => setInfo({...info, description: e.target.value})}
                            placeholder="Add description"
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div className="flex justify-between">
                        {team && <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-white text-red-700 rounded-lg  hover:text-red-900 transition"
                        >
                            Delete
                        </button>}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            onClick={handleSubmit}
                        >
                            {team ? "Update Team" : "Create Team"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
