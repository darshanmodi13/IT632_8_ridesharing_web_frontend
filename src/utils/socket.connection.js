import { io } from "socket.io-client";

const url = "https://ride-share-backend.onrender.com";
// const url = "http://localhost:8080";

const socket = io.connect(url);

export { socket };
