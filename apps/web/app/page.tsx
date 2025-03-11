// "use client";
// import { list, useSocketContext } from "../context/SocketContext";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import AuthScreen from "@/features/auth/components/auth-screen";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  // const { socket, songsList } = useSocketContext();
  // const handleUpvote = (id: number) => {
  //   socket?.emit("vote_for_songs", id);
  // };

  return <div className="h-screen">{!session?.user && <AuthScreen />}</div>;

  return (
    <div>
      {/* {songsList?.map((item: list, i) => {
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
      })} */}
    </div>
  );
}
