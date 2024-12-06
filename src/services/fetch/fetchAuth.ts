import { mainEndpoint } from "../../utils/endpoints";

const API_AUTH = mainEndpoint + '/auth';

type AuthFormValues = {
  username?: string;
  email?: string;
  password: string;
}

// utils/api.ts
export const login = async ({email, password}:AuthFormValues) => {
	const API_LOGIN = API_AUTH + '/login';
	const response = await fetch(API_LOGIN, {
		credentials: 'include',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});
	console.log(response)
	if (!response.ok) {
		const { message } = await response.json();
		throw new Error(message);
	}

	const data =( await response.json()).user; 
	data.lastLogin = new Date();
	return data;
};

type RegisterProps = {
	username: string;
	email?: string;
	password: string;
}

export const register = async ({username, email, password}:RegisterProps) => {
	const API_REGISTER = API_AUTH + '/register';
	const response = await fetch(API_REGISTER, {
		credentials: 'include',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({username, email, password}),
	});

	if (!response.ok) {
		const { message } = await response.json();
		throw new Error(message);
	}
	const data = await response.json();
	
	data.lastLogin = new Date();
	return data;
}

export const authMe = async () => {
	// const AUTH_ENDPOINT = API_AUTH + '/me';
	// const response = await fetch(AUTH_ENDPOINT, { credentials: 'include'});
	// console.log(response)
	// if (response.ok) {
	// 	const data = await response.json();
	// 	return data;
	// } else {
	// 	console.log(response);
	// 	throw new Error('Failed to fetch user'); 
	// }
	const user = {
		id: 'user-id',
		username: 'test-user',
		email: 'testuser@testing',
		role: 'superadmin',
		lastLogin: new Date(),
	}
	return user
}

export const logOut = async () => {
	const LOGOUT_ENDPOINT = API_AUTH + '/logout';
	const response = await fetch(LOGOUT_ENDPOINT, { credentials: 'include', method: 'POST' });
	if (!response.ok) {
		const { message } = await response.json();
		throw new Error(message);
	}
}