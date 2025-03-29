import { Server, Socket } from "socket.io";
import { musicManager, VoteType } from "./controllers/music.controller.js";
import StreamController from "./controllers/streams.controller.js";

export interface CustomSocket extends Socket {
  userId?: string;
}

export const getSocketId = (receiverId: string) => {
  return socketMap.get(receiverId);
};

export const socketMap = new Map();
const upvoteCache: Record<
  string,
  { upvotes: number; userUpvotes: Set<string> }
> = {};

export const initSocket = (io: Server) => {
  io.use((socket: CustomSocket, next) => {
    const userId = socket.handshake.query.userId as string;
    if (!userId) {
      return next(new Error("User Unauthorized"));
    }
    socket.userId = userId;
    next();
  });

  const upVote = async (payload: VoteType) => {
    const { streamId, userId } = payload;

    if (!upvoteCache[streamId]) {
      const dbStream = await prisma.stream.findUnique({
        where: { id: streamId },
        include: { upvotes: true },
      });

      upvoteCache[streamId] = {
        upvotes: dbStream?.upvotes.length || 0,
        userUpvotes: new Set(dbStream?.upvotes.map((votes) => votes.userId)),
      };
    }

    if (!upvoteCache[streamId].userUpvotes.has(userId)) {
      upvoteCache[streamId].upvotes += 1;
      upvoteCache[streamId].userUpvotes.add(userId);

      const cachePayload = {
        streamId,
        upvotes: upvoteCache[streamId].upvotes,
        userUpvote: Array.from(upvoteCache[streamId].userUpvotes),
      };

      // console.log("cachePayload---", cachePayload);
      io.emit("update_upvotes", cachePayload);
      await musicManager.upvote(payload);
    }
  };

  const downVote = async (payload: VoteType) => {
    const { streamId, userId } = payload;

    if (
      upvoteCache[streamId] &&
      upvoteCache[streamId].userUpvotes.has(userId)
    ) {
      upvoteCache[streamId].upvotes -= 1;
      upvoteCache[streamId].userUpvotes.delete(userId);

      const cachePayload = {
        streamId,
        upvotes: upvoteCache[streamId].upvotes,
        userUpvote: Array.from(upvoteCache[streamId].userUpvotes),
      };

      io.emit("update_upvotes", cachePayload);
      await musicManager.downVote(payload);
    }
  };

  const fetchList = async (
    socket: CustomSocket,
    payload: { creatorId: string }
  ) => {
    const { creatorId } = payload;
    const userId = socket.userId;

    const streams = await StreamController.getStream(creatorId, userId);
    socket.emit("list_of_Streams", streams);
  };

  io.on("connection", (socket: CustomSocket) => {
    socketMap.set(socket.userId, socket.id);
    console.log(`Client connected: ${socket.id} || useId: ${socket.userId}`);

    socket.on("fetch_stream_list", (payload) => fetchList(socket, payload));
    socket.on("downvote", (payload) => downVote(payload));
    socket.on("upvote", (payload) => upVote(payload));
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
