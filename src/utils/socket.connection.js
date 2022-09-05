import { io } from "socket.io-client";

const url = "https://se-backend-gid-8-2022.herokuapp.com";
// const url = "http://localhost:8080";

const socket = io.connect(url);

export { socket };
