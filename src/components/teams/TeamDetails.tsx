import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { TeamStats } from "./TeamStats";
import { useAuthUser } from "../../context/authContext";
import { useTeams } from "../../context/teamContext";
import { AssignOrdersToTeam } from "./AssignOrder";
import { OrdersProvider } from "../../context/orderContext";
import { User } from "../../utils/types";
// Define the TeamDetailsProps interface
interface TeamDetailsProps {
    goBack: () => void;
}

export const TeamDetails = ({goBack }: TeamDetailsProps) => {
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [availableUsers, setAvailableUsers] = useState<User[]>([]); 
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const { teamUser, activeTeam, getTeamMembers, addTeamMember,  getAllUsers, deleteTeamMember } = useTeams();
    const { hasAdminRole, hasSuperAdminRole } = useAuthUser();
    
    useEffect(() => {
        (async () => {
            if (activeTeam) {
                getTeamMembers(activeTeam); 
                setUsers(await getAllUsers());
            }
        })()
    }, [activeTeam]);

    useEffect(() => {
        if (users) {
            const available = users.filter((user: User) => !teamUser.some((member: User) => member.username === user.username));
            // Only update state if there's a change in available users
            if (available.length !== availableUsers.length) setAvailableUsers(available);
        }
    }, [teamUser]);

    // State for managing the search query
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        const filtered = availableUsers.filter((user: User) =>
            user.username.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    // Function to handle adding a new member to the team
    const handleAddMember = (user: User) => {
        teamUser.some((member: User) => member.username === user.username) && alert('User is already a member');
        if(activeTeam) {
            addTeamMember(activeTeam, user);
            const index = availableUsers.findIndex((member: User) => member.username === user.username)
            const index2 = filteredUsers.findIndex((member: User) => member.username === user.username)
            availableUsers.splice(index, 1);
            filteredUsers.splice(index2, 1);
        }
    };

    // Function to handle removing a team member
    const handleRemoveMember = (user: User) => {
        activeTeam && deleteTeamMember(activeTeam, user); 
    };


    return (
        <>
            <div className={`p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto relative ${isSearchModalOpen ? 'overflow-y-hidden' : ''}`}>
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    {/* Team Name */}
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {activeTeam?.name || 'No Team Selected'}
                    </h2>
                    
                    {/* Back Button */}
                    <button
                        onClick={goBack}
                        className="py-1 px-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 ease-in-out"
                        aria-label="Back to Teams"
                    >
                        Back to Teams
                    </button>
                </div>

                {/* Members List */}
                <ul className="space-y-4">
                    {teamUser && teamUser.length > 0 && teamUser.map((member: User, index: number) => {
                        if (hasSuperAdminRole())
                            return <TeamMemberListItem key={index} member={member} handleRemoveMember={handleRemoveMember} />
                        else if(member.role !== 'superadmin') 
                            return <TeamMemberListItem key={index} member={member} handleRemoveMember={handleRemoveMember} />
                        else return null;
                    })}
                </ul>

                {/* Add New Member Section */}
                { hasAdminRole() &&
                    <div className="mt-4 bg-green-100 rounded-lg p-4 flex justify-center">
                        <span
                            className="text-green-700 font-semibold cursor-pointer hover:text-green-800 "
                            onClick={() => setSearchModalOpen(true)}
                        >
                            + Add new member
                        </span>
                    </div>
                }
                
                {teamUser && <TeamStats members={teamUser} />}

                {/* Overlay and Add Member Search Modal */}
                {isSearchModalOpen && (
                    <>
                        {/* Overlay */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" />
                        {/* Modal */}
                        <div className="fixed inset-0 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-xl font-semibold mb-4">Search and Add Member</h3>
                                
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mb-4 border rounded-lg"
                                    placeholder="Search by username"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            
                                {/* List of available users */}
                                <ul className="space-y-2 max-h-60 overflow-y-auto">
                                    {filteredUsers.length === 0 && (
                                        <li className="text-gray-500">No users found</li>
                                    )}
                                    {filteredUsers.map((user: User) => (
                                        <li
                                            key={user.id}
                                            className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleAddMember(user)}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-gray-700">{user.username}</span>
                                                <span className="text-gray-500 text-xs">{user.email}</span>
                                            </div>
                                            <button className="text-blue-600">Add</button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Close Modal */}
                                <button
                                    onClick={() => setSearchModalOpen(false)} // Close the modal
                                    className="mt-4 w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <OrdersProvider>
                <AssignOrdersToTeam />
            </OrdersProvider>
        </>      
    );
};


const TeamMemberListItem = ({member, handleRemoveMember}:{member:User, handleRemoveMember:(member:User)=>void}) => {
    const {hasAdminRole} = useAuthUser();
    return (
        <li className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex flex-col">
                <span className="text-gray-700">{member.username}</span>
                <span className="text-gray-500 text-xs">{member.email}</span>
            </div>
            <span className="text-gray-600">{member.role}</span>
            {
                hasAdminRole()  && <IoCloseSharp
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition"
                    aria-label={`Remove ${member.username}`}
                    onClick={() => handleRemoveMember(member)}
                />
            }
            
        </li>
    )
}