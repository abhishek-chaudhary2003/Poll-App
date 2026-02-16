import { io } from "socket.io-client";

export const socket = io(
  "https://poll-ib3fnwxwj-abhishek10299s-projects.vercel.app",
  {
    transports: ["websocket", "polling"] // fallback to polling
  }
);
