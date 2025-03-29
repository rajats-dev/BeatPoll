"use client";
import { Music } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/useModalStore";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

const Header = () => {
  const { onOpen } = useModal();
  const pathname = usePathname();
  const { data } = useSession();
  const session: CustomSession | null = data;

  return (
    <header className="mx-auto px-4 py-4 flex justify-between items-center bg-emerald-950/70 border-r border-emerald-800">
      <div className="flex items-center gap-2">
        {pathname == "/" && <Music className="h-6 w-6 text-emerald-400" />}
        <span className="text-xl font-bold text-white"></span>
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
