import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import pollRoutes from "./routes/pollRoutes.js";
import mongoose from "mongoose";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "https://poll-ancbjj38o-abhishek10299s-projects.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/polls", pollRoutes);

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("joinPoll", (pollId) => {
    socket.join(pollId);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`),
    );
  })
  .catch((err) => console.log(err));
