import { useEffect } from "react";
import { Authentication } from "./components/authentication/Authentication";
import { MainApp } from "./components/main/Main";
import { useAuthUser } from "./context/authContext";
import { socket } from "./services/sockets/socket";


export const App = () => { 
	const{ isAuth, authUser, loading } = useAuthUser();

	useEffect(() => {
        // Ensure socket connection
        const connectSocket = () => {
            if (socket.connected) {
                console.log("Already connected with ID:", socket.id);
                if (authUser) {
                    socket.emit('client-connected', authUser);
                }
            } else {
                console.log("Reconnecting socket...");
                socket.connect();
            }
        };

        connectSocket();

        // Listen for connection events
        socket.on('connect', () => {
            console.log("Connected to server with ID:", socket.id);
            if (authUser) {
                socket.emit('client-connected', authUser);
            }
        });

        // Listen for user-connected event
        socket.on('user-connected', (data) => {
            console.log('User connected event:', data);
        });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log(`Disconnected from server, Reason: ${reason}`);
        });

        // Handle reconnection
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off('connect');
            socket.off('user-connected');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, [authUser]);


	if (loading) {
		return <div>Loading...</div>;
	}

	if (isAuth && authUser) {
		return <MainApp />;
	} else {
		return <Authentication />;
	}
};
