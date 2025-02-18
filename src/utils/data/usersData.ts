import { User } from "../types";

const users: User[] = [
    {
        id: "1",
        username: "John Doe",
        email: "john.doe@example.com",
        role: "admin",
        lastLogin: new Date("2025-02-10T09:15:00Z"),
    },
    {
        id: "2",
        username: "Jane Smith",
        email: "jane.smith@example.com",
        role: "manager",
        lastLogin: new Date("2025-02-09T14:22:00Z"),
    },
    {
        id: "3",
        username: "Michael Brown",
        email: "michael.brown@example.com",
        role: "staff",
        lastLogin: new Date("2025-02-08T07:30:00Z"),
    },
    {
        id: "4",
        username: "Emily Davis",
        email: "emily.davis@example.com",
        role: "pending",
        lastLogin: new Date("2025-02-07T18:45:00Z"),
    },
        {
        id: "5",
        username: "Robert Johnson",
        email: "robert.johnson@example.com",
        role: "superadmin",
        lastLogin: new Date("2025-02-05T11:50:00Z"),
    },
    {
        id: "6",
        username: "Linda Lee",
        email: "linda.lee@example.com",
        role: "staff",
        lastLogin: new Date("2025-02-06T16:30:00Z"),
    },
    {
        id: "7",
        username: "William Garcia",
        email: "william.garcia@example.com",
        role: "manager",
        lastLogin: new Date("2025-02-04T12:00:00Z"),
    },
    {
        id: "8",
        username: "Sarah Martin",
        email: "sarah.martin@example.com",
        role: "pending",
        lastLogin: new Date("2025-02-03T08:20:00Z"),
    },
    // {
    //     id: "9",
    //     username: "David Smith",
    //     email: "david.smith@example.com",
    //     role: "staff",
    //     lastLogin: new Date("2025-02-02T19:10:00Z"),
    // },
    // {
    //     id: "10",
    //     username: "Amy Wilson",
    //     email: "amy.wilson@example.com",
    //     role: "admin",
    //     lastLogin: new Date("2025-02-01T07:55:00Z"),
    // },
];
  
export function getRandomUsers({n}:{n:number|string}) {
    const clonedUsers = [...users];
    for (let i = clonedUsers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clonedUsers[i], clonedUsers[j]] = [clonedUsers[j], clonedUsers[i]];
    }
    if(typeof n === 'string') return clonedUsers
    return clonedUsers.slice(0, n);
}