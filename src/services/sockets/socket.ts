import { io } from "socket.io-client";
import { socketEndpoint } from "../../utils/endpoints";

export const socket = io(socketEndpoint, {
    withCredentials: true,
    transports: ['websocket'],
});

