"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const socketURL = "http://localhost:8000";

export interface list {
  id: number;
  artist: string;
  title: string;
  url: string;
  vote: number;
}

interface ISocketContext {
  socket: Socket | null;
  songsList: list[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [songs, songList] = useState([]);
  const { data } = useSession();
  const session: CustomSession | null = data;

  useEffect(() => {
    const socket = io(socketURL, {
      query: {
        userId: session?.user?.id,
      },
    });
    socketRef.current = socket;

    socket.emit("fetch_list");

    socket.on("list_of_songs", (payload) => {
      console.log(payload);
      songList(payload);
    });

    socket.on("updated_votes", (payload) => {
      songList(payload);
    });

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [session]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, songsList: songs }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
