import { User } from "../types";

export const allUsers : User[] = [
    {
        id: '1',
        username: 'admin',
        email: 'admin@admin.com',
        role: 'admin',
        lastLogin: new Date()
    },
    {
        id: '2',
        username: 'user',
        email: 'user@user.com',
        role: 'staff',
        lastLogin: new Date()
    },
    {
        id: '3',
        username: 'manager',
        email: 'manager@manage.com',
        role: 'manager',
        lastLogin: new Date()
    },
    {
        id: '4',
        username: 'pending',
        email: 'pending@pending.com',
        role: 'pending',
        lastLogin: new Date()
    }
]