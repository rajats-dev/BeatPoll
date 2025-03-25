"use client";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import useListenStreams from "@/hooks/socketQueries/useListenStreams";
import Select_Env from "@/lib/env";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export interface list {
  id: number;
  artist: string;
  title: string;
  url: string;
  vote: number;
}

interface ISocketContext {
  socket: Socket | null;
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
const socketURL = Select_Env.BACKEND_URL;

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const session: CustomSession | null = data;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      const newSocket = io(socketURL, {
        query: {
          userId: session?.user?.id,
        },
      });
      setSocket(newSocket);

      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else if (!session?.user?.id) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [session?.user?.id]);

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
