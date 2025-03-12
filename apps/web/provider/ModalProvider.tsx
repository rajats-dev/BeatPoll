"use client";

import { CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
import AuthScreen from "@/features/auth/components/auth-screen";

export const ModalProvider = () => {
  // const { data } = useSession();

  // const session: CustomSession | null = data;

  return (
    <>
      <AuthScreen />
    </>
  );
};
