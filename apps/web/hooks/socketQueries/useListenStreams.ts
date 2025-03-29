/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSocketContext } from "@/context/SocketContext";
import { Dispatch, SetStateAction, useEffect } from "react";
import useStreamQueue, { Video } from "../state/useStreamQueue";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const useListenStreams = (
  setCurrentVideo: Dispatch<SetStateAction<Video | null>>
) => {
  const { socket } = useSocketContext();
  const { setQueue } = useStreamQueue();
  const { data } = useSession();
  const session: CustomSession | null = data;

  // console.log(queue);

  useEffect(() => {
    if (!socket) {
      console.warn("Socket not initialized yet in useListenStreams!");
      return;
    }

    console.log("Initializing stream listener...");

    socket.on("list_of_Streams", (payload) => {
      console.log("Client-Stream--", payload);
      const filteredPayload: Video[] = payload?.stream?.sort(
        (a: any, b: any) => (a.upvotes < b.upvotes ? 1 : -1)
      );
      setQueue(filteredPayload);
      setCurrentVideo((video: any) => {
        if (video?.id === payload?.activeStream?.stream?.id) {
          return video;
        }
        return payload?.activeStream?.stream;
      });
    });

    socket.on("add_song", (payload) => {
      setQueue((prevQueue: Video[]) => [...prevQueue, payload]);
    });

    socket.on("next_song", (payload) => {
      setCurrentVideo(payload.stream);
      setQueue((prevQueue: Video[]) =>
        prevQueue.filter((x) => x.id !== payload.stream?.id)
      );
    });

    socket.on("update_upvotes", (payload) => {
      const { streamId, upvotes, userUpvote } = payload;
      console.log(payload);

      setQueue((prevQueue) =>
        prevQueue
          .map((video) =>
            video.id == streamId
              ? {
                  ...video,
                  upvotes: upvotes,
                  haveUpvoted: userUpvote.includes(session?.user?.id),
                }
              : video
          )
          .sort((a, b) => b.upvotes - a.upvotes)
      );
    });

    return () => {
      socket.off("list_of_Streams");
      socket.off("add_song");
      socket.off("next_song");
      socket.off("update_upvotes");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
};

export default useListenStreams;
