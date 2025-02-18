import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { TeamStats } from "./TeamStats";
import { useAuthUser } from "../../context/authContext";
import { useTeams } from "../../context/teamContext";
import { AssignOrdersToTeam } from "./AssignOrder";
import { OrdersProvider } from "../../context/orderContext";
import { User } from "../../utils/types";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";

// Define the TeamDetailsProps interface
interface TeamDetailsProps {
    goBack: () => void;
}

export const TeamDetails = ({goBack }: TeamDetailsProps) => {
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);
    const [availableUsers, setAvailableUsers] = useState<User[]>([]); 
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { teamUser, activeTeam, getTeamMembers, addTeamMember,  getAllUsers, deleteTeamMember } = useTeams();
    const { hasAdminRole, hasSuperAdminRole } = useAuthUser();
    
    useEffect(() => {
        (async () => {
            if (activeTeam) {
                getTeamMembers(activeTeam);      
                const available = (await getAllUsers()).filter((user: User) => !teamUser.some((member: User) => member.username === user.username));
                setAvailableUsers(available);
                setFilteredUsers(available)
            }
        })()
    }, [activeTeam]);

    useEffect(() => {
    }, [teamUser]);

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
            <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg transition-all duration-300">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-800">{activeTeam?.name || "No Team Selected"}</h2>
                    <button
                        onClick={goBack}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
                        aria-label="Back to Teams"
                    >
                        Back
                    </button>
                </div>

                {/* Members List */}
                <ul className="space-y-3">
                    {teamUser && teamUser.length > 0 ? teamUser.map((member: User, index: number) => {
                        if (hasSuperAdminRole())
                            return <TeamMemberListItem key={index} member={member} handleRemoveMember={handleRemoveMember} />
                        else if(member.role !== 'superadmin') 
                            return <TeamMemberListItem key={index} member={member} handleRemoveMember={handleRemoveMember} />
                        else return null;
                    }) : (
                        <p className="text-gray-500">No members in this team yet.</p>
                    )}
                </ul>

                {/* Floating Add Member Button */}
                {hasAdminRole() && 
                    <button
                        className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all"
                        onClick={() => setSearchModalOpen(true)}
                    >
                        <FaPlus />
                    </button>
                }
                
                {/* Stats Section */}
                {teamUser.length > 0 && <TeamStats members={teamUser} />}
            </div>

            <AnimatePresence>
                {isSearchModalOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        {/* Modal */}
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-50"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                <h3 className="text-lg font-semibold mb-4">Add a Member</h3>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md mb-3"
                                    placeholder="Search by username"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <ul className="max-h-40 overflow-y-auto space-y-2">
                                    {filteredUsers.length === 0 ? (
                                        <li className="text-gray-500">No users found</li>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <li
                                                key={user.id}
                                                className="flex justify-between items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
                                            >
                                                <span className="text-gray-700">{user.username}</span>
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => handleAddMember(user)}
                                                >
                                                    Add
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                                <button
                                    className="mt-4 w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                    onClick={() => setSearchModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <OrdersProvider>
                <AssignOrdersToTeam />
            </OrdersProvider>
        </>
    );
};


const TeamMemberListItem = ({member, handleRemoveMember}: {member: User; handleRemoveMember: (member: User) => void;}) => {
    const { hasAdminRole } = useAuthUser();
  
    const getInitials = (name: string) => {
        return name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg border border-gray-200 
          transition-all duration-300 hover:shadow-xl active:scale-95 md:flex-row flex-col">
            
            {/* Avatar */}
            <div className="w-14 h-14 flex items-center justify-center text-lg font-semibold text-white rounded-full 
                bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
                {getInitials(member.username)}
            </div>
    
            {/* User Info */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <h3 className="text-gray-900 font-semibold text-lg">{member.username}</h3>
                <p className="text-gray-500 text-sm">{member.email}</p>
            </div>
    
            {/* Role & Actions (On larger screens, moves to the right) */}
            <div className="flex items-center gap-3 mt-3 md:mt-0 md:ml-auto">
                {/* Role Badge */}
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                    {member.role}
                </span>
        
                {/* Remove Button (Only visible to admins) */}
                {hasAdminRole() && (
                    <button
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-red-500 
                        hover:bg-red-500 hover:text-white transition-all duration-300 relative overflow-hidden"
                        aria-label={`Remove ${member.username}`}
                        onClick={() => handleRemoveMember(member)}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleRemoveMember(member)}
                    >
                        <IoCloseSharp className="w-5 h-5" />
                        {/* Ripple Effect */}
                        <span className="absolute inset-0 bg-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
                    </button>
                )}
            </div>
        </div>
    );
};