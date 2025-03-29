import prisma from "../config/db.config.js";
import { z } from "zod";

const voteSchema = z.object({
  streamId: z.string(),
  userId: z.string(),
});

export type VoteType = z.infer<typeof voteSchema>;

class MusicManager {
  async upvote(payload: VoteType) {
    try {
      const data = voteSchema.parse(payload);
      const res = await prisma.upvote.create({
        data: {
          userId: data.userId,
          streamId: data.streamId,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async downVote(payload: VoteType) {
    try {
      const data = voteSchema.parse(payload);
      await prisma.upvote.delete({
        where: {
          userId_streamId: {
            userId: data.userId,
            streamId: data.streamId,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const musicManager = new MusicManager();
