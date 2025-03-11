import prisma from "../config/db.config.js";
import { CustomSocket } from "../socket.js";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});

class MusicManager {
  upvote(socket: CustomSocket) {
    socket.on("upvote", async (payload) => {
      const user = await prisma.user.findFirst({
        where: { id: socket.userId },
      });

      if (!user) {
        return new Error("User does not exist!");
      }

      try {
        const data = UpvoteSchema.parse(payload);
        await prisma.upvote.create({
          data: {
            userId: user.id,
            streamId: data.streamId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
  downVote(socket: CustomSocket) {
    socket.on("downvote", async (payload) => {
      const user = await prisma.user.findFirst({
        where: { id: socket.userId },
      });

      if (!user) {
        return new Error("User does not exist!");
      }

      try {
        const data = UpvoteSchema.parse(payload);
        await prisma.upvote.delete({
          where: {
            userId_streamId: {
              userId: user.id,
              streamId: data.streamId,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
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
