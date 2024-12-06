import { Team } from "../../context/teamContext";

type HandleNewTeamProp = {
    team: Team;
    teams: Team[];
    setActiveTeam?: (team: Team | null) => void;
    setTeams: (teams: Team[]) => void;
}


export const handleNewTeam = ({ team, teams, setTeams }: HandleNewTeamProp) => setTeams([...teams, team]);

export const handleUpdateTeam = ({ team, teams, setTeams, setActiveTeam }: HandleNewTeamProp) => {
    const index = teams.findIndex((item: Team) => item.id === team.id);
    teams[index] = team;
    setTeams(teams);
    const viewTeam = JSON.parse(localStorage.getItem('viewTeam') || '{}');
    if (viewTeam.id === team.id) {
        localStorage.setItem('viewTeam', JSON.stringify(team));
    }
    setActiveTeam && setActiveTeam(team);
}

export const handleDeleteTeam = ({ team, teams, setTeams }: HandleNewTeamProp) => {
    console.log('team', team);
    const newTeams = teams.filter((item: Team) => item.id !== team.id);
    setTeams(newTeams);
    localStorage.setItem('viewTeam', JSON.stringify({
        team: null,
        view: false 
    }));
}


