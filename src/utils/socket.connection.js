import {io} from "socket.io-client"

const socket = io.connect("http://localhost:8081");

export { socket };
