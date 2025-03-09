"use client";
import { list, useSocketContext } from "../context/SocketContext";

export default function Home() {
  const { socket, songsList } = useSocketContext();

  const handleUpvote = (id: number) => {
    socket?.emit("vote_for_songs", id);
  };

  return (
    <div>
      {songsList?.map((item: list, i) => {
        return (
          <div
            key={i}
            className="bg-white  text-black font-bold p-10 rounded-lg"
          >
            <p>{item?.title}</p>
            <div className="flex items-center">
              <p>{item?.vote}</p>
              <button onClick={() => handleUpvote(item?.id)}>⬆️</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
