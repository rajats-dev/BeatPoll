import { Server, Socket } from "socket.io";
import { musicManager, VoteType } from "./controllers/music.controller.js";
import StreamController from "./controllers/streams.controller.js";
import { StreamType } from "@prisma/client";

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

  const upVote = async (payload: VoteType, userId: string) => {
    const upVoteSuccess = await musicManager.upvote(payload);

    // const { creatorId } = payload;

    // const streams = await StreamController.getStream(creatorId, userId);
    // console.log("upvote--", userId, streams);

    // if (streams) {
    //   io.emit("list_of_Streams", streams);
    // }
  };

  // ///////////////

  const downVote = async (payload: VoteType, userId: string) => {
    const upVoteSuccess = await musicManager.downVote(payload);

    // const { creatorId } = payload;
    // const streams = await StreamController.getStream(creatorId, userId);
    // console.log("downvote---", streams);

    // if (streams) {
    //   io.emit("list_of_Streams", streams);
    // }
  };

  io.on("connection", (socket: CustomSocket) => {
    console.log(`Client connected: ${socket.id} || useId: ${socket.userId}`);

    socket.on("fetch_stream_list", async (payload) => {
      const { creatorId } = payload;
      const userId = socket.userId;

      const streams = await StreamController.getStream(creatorId, userId);
      console.log("streams--", userId, streams);
      socket.emit("list_of_Streams", streams);
    });
    // musicManager.upvote(socket);

    socket.on("downvote", (payload) => downVote(payload, socket.userId));
    socket.on("upvote", (payload) => upVote(payload, socket.userId));
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
