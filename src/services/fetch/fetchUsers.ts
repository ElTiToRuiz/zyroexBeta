import { User } from "../../context/authContext";
import { mainEndpoint } from "../../utils/endpoints";

const fetchUsers = async () => {
    const ENDPOINT = `${mainEndpoint}/users`;
    const response = await fetch(ENDPOINT);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data;
}

export const fetchGetAllUser = async () => {
    // const cachedUsers = localStorage.getItem('users');
    // if (cachedUsers) {
    //     console.log('Using cached users');
    //     return JSON.parse(cachedUsers);
    // }

    try {
        console.log('Fetching users from API');
        const users = await fetchUsers();
        localStorage.setItem('users', JSON.stringify(users));
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
} 

export const fetchUpdateUser = async (user: User) => {
    const ENDPOINT = `${mainEndpoint}/users/admin`;
    const response = await fetch(ENDPOINT, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
}

type UpdateProfile = {
    id: string
    username: string;
    email: string;
    password: string;
}
export const fetchUpdateUserProfile =  async (newUser:UpdateProfile) => {
    try{
        const ENDPOINT = `${mainEndpoint}/users/profile`;
        const response = await fetch(ENDPOINT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        if (response.ok) {
            alert('Profile updated successfully');
        }else {
            alert('Failed to update profile');
        }
    } catch (error) {
        console.error('Error:', error)
        alert('An error occurred');
    }
}


export const fetchCreateUser = async (user: User) => {
    const ENDPOINT = `${mainEndpoint}/users/create`;
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
}


export const fetchDeleteUser = async (user: User) => {
    const ENDPOINT = `${mainEndpoint}/users/delete`;
    const response = await fetch(ENDPOINT, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
}
