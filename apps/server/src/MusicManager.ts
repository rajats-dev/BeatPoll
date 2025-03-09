import { Socket } from "socket.io";
import { songs } from "./data/musicList.js";
import { io } from "./index.js";

class MusicManager {
  upvote(socket: Socket) {
    socket.on("vote_for_songs", (songId) => {
      const song = songs.find((sng) => sng.id == songId);
      if (song) {
        song.vote += 1;
        let updateSongs = songs.sort((a, b) => b.vote - a.vote);
        io.emit("updated_votes", updateSongs);
      }
    });
  }
}

export const musicManager = new MusicManager();
