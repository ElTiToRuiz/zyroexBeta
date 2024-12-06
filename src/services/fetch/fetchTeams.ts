import { User } from "../../context/authContext";
import { Team } from "../../context/teamContext";
import { mainEndpoint } from "../../utils/endpoints";

const fetchTeams = async (user: User) => {
    const TEAMS_ENDPOINT = `${mainEndpoint}/teams/`
    ;
    const response = await fetch(TEAMS_ENDPOINT,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    ); 
    if (!response.ok) {
        throw new Error('Failed to fetch teams');
    }
    const data = await response.json();
    return data;
}

export const getTeams = async (user: User) => {
    // const cachedTeams = localStorage.getItem('teams');
    // if (cachedTeams) {
    //     console.log('Using cached teams');
    //     return JSON.parse(cachedTeams);
    // }
    try{
        const teams = await fetchTeams(user);
        return teams;
    }catch(error){ 
        console.error('Error fetching teams:', error);
        return [];
    }
}


export const fetchCreateTeam = async (name: string, description: string) => {
    const ENDPOINT = `${mainEndpoint}/teams/create`;
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
    });
    if (!response.ok) {
        throw new Error('Failed to create team');
    };
}


export const fetchUpdateTeam = async (team: Team) => {
    const ENDPOINT = `${mainEndpoint}/teams/update`;
    const response = await fetch(ENDPOINT, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    });
    if (!response.ok) {
        throw new Error('Failed to update team');
    }
}

export const fetchDeleteTeam = async (team: Team) => {
    const ENDPOINT = `${mainEndpoint}/teams/delete`;
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    });
    if (!response.ok) {
        throw new Error('Failed to delete team');
    }
}


export const fetchTeamMates = async (teamId: string) => {
    const ENDPOINT = `${mainEndpoint}/teams/users/${teamId}`;
    const response = await fetch(ENDPOINT);
    if (!response.ok) {
        throw new Error('Failed to fetch team mates');
    }
    const data = await response.json();
    return data;
}


export const fetchAddTeamMate = async (team: Team, user: User) => {
    const ENDPOINT = `${mainEndpoint}/teams/assign`;
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, teamId: team.id })
    });
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to add team mate');
    }
}

export const fetchDeleteTeamMate = async (team: Team, user: User) => {
    const ENDPOINT = `${mainEndpoint}/teams/remove`;
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, teamId: team.id })
    });
    if (!response.ok) {
        console.log(response)
        throw new Error('Failed to delete team mate');
    }
}

