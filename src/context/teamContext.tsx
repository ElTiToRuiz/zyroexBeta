import { createContext, useContext, useEffect, useState } from "react";
import { fetchCreateTeam, fetchDeleteTeam, fetchTeamMates, fetchUpdateTeam, getTeams } from "../services/fetch/fetchTeams";
import { useAuthUser, User } from "./authContext";
import { fetchGetAllUser } from "../services/fetch/fetchUsers";
import { socket } from "../services/sockets/socket";
import { handleDeleteTeam,handleNewTeam, handleUpdateTeam } from "../services/sockets/teamSocket";

export type Team = {
    id: string;
    name: string;
    description: string;
}

interface TeamContextType {
    teams: Team[];
    activeTeam: Team | null;
    teamUser: User[];
    loading: boolean;
    error: string;
    // getTeams: (user: User) => void;
    setActiveTeam: (team: Team | null) => void;
    getAllUsers: () => Promise<User[] | never>;
    createTeam: (name: string, description:string) => void;
    updateTeam: (team: Team) => void;
    deleteTeam: (team: Team) => void;
    getTeamMembers: (team: Team) => Promise<User[] | never>;
    addTeamMember: (team: Team, user: User) => void;
    deleteTeamMember: (team: Team, user: User) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTeam, setActiveTeam] = useState<Team | null>(null);
    const [teamUser, setTeamUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const {authUser, hasAdminRole} = useAuthUser();

    useEffect(() => {
        (async () => {
            if (authUser) {
                const teams =  await getTeams(authUser);
                setTeams(teams);
                setLoading(false);
            }
        })();
    }, [])


    useEffect(() => {
        const handleNewTeamEvent = (team: Team) => handleNewTeam({ team, teams, setTeams });
        const handleUpdateTeamEvent = (team: Team) => handleUpdateTeam({ team, teams, setTeams, setActiveTeam });
        const handleDeleteTeamEvent = (team: Team) => handleDeleteTeam({ team, teams, setTeams });
        socket.on('team-created', handleNewTeamEvent);
        socket.on('team-updated', handleUpdateTeamEvent);
        socket.on('team-deleted', handleDeleteTeamEvent);
        
        socket.on('team-member-added', ({team, user})=>{
            console.log(user);
            if(hasAdminRole()) {
                if(activeTeam && team.id === activeTeam.id) setTeamUsers((prevUsers) => [...prevUsers, user]);
            }else if (activeTeam && team.id === activeTeam.id)setTeamUsers((prevUsers) => [...prevUsers, user]);
        });
        
        socket.on('team-member-removed', ({team, user})=>{
            if(hasAdminRole()){
                if (activeTeam && team.id === activeTeam.id) setTeamUsers((prevUsers) => prevUsers.filter((member) => member.id !== user.id));
            }else if (user.id === authUser?.id) setTeams((prevTeams) => prevTeams.filter(t => t.id !== team.id));
        });

        return () => {
            socket.off('team-created', handleNewTeamEvent);
            socket.off('team-updated', handleUpdateTeamEvent);
            socket.off('team-deleted', handleDeleteTeamEvent);
            socket.off('team-member-added');
            socket.off('team-member-removed');
        };
    }, [teams])

    // const getTeams = async (user: User) => {
    //     const  teams = await getTeams(user);
    //     setTeams(teams);
    //     setLoading(false);
    // }


    const getAllUsers = async () => {
        const users = await fetchGetAllUser();
        return users;
    }
    
    const createTeam = async (name:string, description:string) => { 
        try {
            await fetchCreateTeam(name, description);
        } catch (error) {
            console.log(error);
            setError('Error creating team');
        }
    }

    const updateTeam = async (team: Team) => {
        try{
            await fetchUpdateTeam(team);
            setActiveTeam(team);
        }catch(error){
            console.log(error);
            setError('Error updating team');
        }
    }

    const deleteTeam = async (team: Team) => {
        try{
            await fetchDeleteTeam(team);
        }catch(error){
            console.log(error);
            setError('Error deleting team');
        }
    }

    const getTeamMembers = async (team: Team) => {
        try {
            setActiveTeam(team);
            const response = await fetchTeamMates(team.id);
            setTeamUsers(response);
            return response;
        } catch (error) {
            console.log(error);
            setError('Error fetching team members');
            return [];
        }
    }

    const addTeamMember = async (team: Team, user: User) => {
        try {
            socket.emit('add-user-to-team', { team, user });
            // const newTeamUsers = [...teamUser, user]
            // setTeamUsers(newTeamUsers); 
        } catch (error) {
            console.log(error);
            setError('Error adding team member');
        }
    };

    const deleteTeamMember = async (team: Team, user: User) => {
        try {
            socket.emit('remove-user-from-team', {team, user});
            // activeTeam && activeTeam.id === team.id &&
            //  setTeamUsers(teamUser.filter((member) => member.id !== user.id));
        } catch (error) {
            console.log(error);
            setError('Error deleting team member');
        }
    }

    return (
        <TeamContext.Provider
            value={{ teams, activeTeam, teamUser, loading, error, setActiveTeam, getAllUsers, createTeam, updateTeam, deleteTeam, getTeamMembers, addTeamMember, deleteTeamMember }}
        >
            {children}
        </TeamContext.Provider>
    );
}

export const useTeams = (): TeamContextType => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeams must be used within a TeamProvider');
    }
    return context;
}
