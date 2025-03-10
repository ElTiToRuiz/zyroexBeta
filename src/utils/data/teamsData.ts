import { Team } from "../types";
import { getRandomUsers } from "./usersData";

export const newTeams: Team[] = [
    {
        id: 't-1',
        name: 'Team 1',
        description: 'Team 1 description',
        users: getRandomUsers({n:2})
    },
    {
        id: 't-2',
        name: 'Team 2',
        description: 'Team 2 description',
        users: getRandomUsers({n:2})
    },
    {
        id: 't-3',
        name: 'Team 3',
        description: 'Team 3 description',
        users: getRandomUsers({n:2})
    },
    {
        id: 't-4',
        name: 'Team 4',
        description: 'Team 4 description',
        users: getRandomUsers({n:2})
    }
]