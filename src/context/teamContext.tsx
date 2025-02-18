import { createContext, useContext, useEffect, useState } from "react";
import { useAuthUser } from "./authContext";
import { Team, User } from "../utils/types";
import { newTeams } from "../utils/data/teamsData";
import { getRandomUsers } from "../utils/data/usersData";

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
    const {authUser} = useAuthUser();

    useEffect(() => {
        (async () => {
            if (authUser) {
                const t = newTeams
                setTeams(t);
                setLoading(false);
            }
        })();
    }, [])


    const getAllUsers = async () => {
        // const users = [] as User[];
        return getRandomUsers({n:'all'})
    }
    
    const createTeam = async (name:string, description:string) => { 
        try {
            setTeams([...teams,  {id: 'nt', name, description, users: []}]);
        } catch (error) {
            console.error(error);
            setError('Error creating team');
        }
    }

    const updateTeam = async (team: Team) => {
        try{

            setActiveTeam(team);
        }catch(error){
            console.error(error);
            setError('Error updating team');
        }
    }

    const deleteTeam = async (team: Team) => {
        try{
            setTeams(teams.filter((t) => t.id !== team.id));
        }catch(error){
            console.error(error);
            setError('Error deleting team');
        }
    }

    const getTeamMembers = async (team: Team) => {
        try {
            setActiveTeam(team);
            const response = team.users
            setTeamUsers(response);
            return response;
        } catch (error) {
            console.error(error);
            setError('Error fetching team members');
            return [];
        }
    }

    const addTeamMember = async (team: Team, user: User) => {
        try {
            team.users.push(user);
            setTeamUsers([...team.users]);
        } catch (error) {
            console.error(error);
            setError('Error adding team member');
        }
    }

    const deleteTeamMember = async (team: Team, user: User) =>{
        try {
            team.users = team.users.filter((u) => u.id !== user.id);
            setTeamUsers([...team.users]);
        } catch (error) {
            console.error(error);
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
