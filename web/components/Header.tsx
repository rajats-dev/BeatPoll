"use client";
import React from "react";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/useModalStore";
import { signOut, useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

const Header = () => {
  const { onOpen } = useModal();
  const { data } = useSession();
  const session: CustomSession | null = data;

  return (
    <header className="mx-auto px-4 py-4 flex justify-between items-center bg-emerald-950/70 border-r border-emerald-800">
      <div className="flex items-center gap-2">
        <Image src={"/beatpoll.png"} alt="logo" width={35} height={35} />
        <span className="text-xl font-bold text-white">BeatPoll</span>
      </div>
      {session?.user ? (
        <Button
          variant="outline"
          className="bg-transparent border-emerald-400 text-white hover:bg-emerald-800"
          onClick={() =>
            signOut({
              callbackUrl: "/",
              redirect: true,
            })
          }
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="outline"
          className="bg-transparent border-emerald-400 text-white hover:bg-emerald-800"
          onClick={() => onOpen("auth")}
        >
          Sign In
        </Button>
      )}
    </header>
  );
};

export default Header;
