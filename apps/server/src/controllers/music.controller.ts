import prisma from "../config/db.config.js";
import { CustomSocket } from "../socket.js";
import { TypeOf, z } from "zod";

const voteSchema = z.object({
  streamId: z.string(),
  userId: z.string(),
  creatorId: z.string(),
});

export type VoteType = z.infer<typeof voteSchema>;

class MusicManager {
  async upvote(payload: VoteType) {
    // const user = await prisma.user.findFirst({
    //   where: { id: payload.userId },
    // });

    // if (!user) {
    //   return new Error("User does not exist!");
    // }

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
    // const user = await prisma.user.findFirst({
    //   where: { id: payload.userId },
    // });

    // if (!user) {
    //   return new Error("User does not exist!");
    // }

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

// playNextSong(socket: Socket) {
//   this.currentSong = songs.sort((a, b) => b.vote - a.vote)[0];
//   setTimeout(() => this.playNextSong, 3000);
// }
// socket.on("vote_for_songs", (songId) => {
//   const song = songs.find((sng) => sng.id == songId);
//   if (song) {
//     song.vote += 1;
//     let updateSongs = songs.sort((a, b) => b.vote - a.vote);
//     io.emit("updated_votes", updateSongs);
//   }
// });
