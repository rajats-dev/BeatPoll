import { Server, Socket } from "socket.io";
import { musicManager } from "./controllers/music.controller.js";
import { songs } from "./data/musicList.js";

export interface CustomSocket extends Socket {
  userId?: string;
}

export const initSocket = (io: Server) => {
  io.use((socket: CustomSocket, next) => {
    const userId = socket.handshake.query.userId as string;
    if (!userId) {
      return next(new Error("User Unauthorized"));
    }
    socket.userId = userId;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log("useId ----", socket.userId);
    console.log(`Client connected with ID: ${socket.id}`);

    socket.on("fetch_list", () => {
      socket.emit("list_of_songs", songs);
    });

    musicManager.upvote(socket);

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
    });
  });
};
