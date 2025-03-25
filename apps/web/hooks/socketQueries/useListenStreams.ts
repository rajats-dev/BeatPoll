/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import useStreamQueue from "../state/useStreamQueue";

const useListenStreams = (setCurrentVideo: any) => {
  const { socket } = useSocketContext();
  const { setQueue } = useStreamQueue();

  useEffect(() => {
    if (!socket) {
      console.warn("Socket not initialized yet in useListenStreams!");
      return;
    }

    console.log("Initializing stream listener...");
    socket.on("list_of_Streams", (payload) => {
      console.log("Client-Stream--", payload);
      const filteredPayload = payload?.stream?.sort((a: any, b: any) =>
        a.upvotes < b.upvotes ? 1 : -1
      );
      setQueue(filteredPayload);
      setCurrentVideo((video: any) => {
        if (video?.id === payload.activeStream?.stream?.id) {
          return video;
        }
        return payload.activeStream.stream;
      });
    });

    return () => {
      socket.off("list_of_Streams");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
};

export default useListenStreams;
