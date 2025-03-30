import type { Metadata } from "next";

import "./globals.css";
import SocketContextProvider from "../context/SocketContext";
import SessionProvider from "../provider/SessionProvider";
import { ModalProvider } from "@/provider/ModalProvider";

export const metadata: Metadata = {
  title: "BeatPoll",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <SocketContextProvider>
            <ModalProvider />
            {children}
          </SocketContextProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
