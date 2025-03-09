import { Server, Socket } from "socket.io";
import { musicManager } from "./MusicManager.js";
import { songs } from "./data/musicList.js";

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
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
