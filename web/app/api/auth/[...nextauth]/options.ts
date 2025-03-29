import { AUTH_USER } from "@/lib/apiAuthRoute";
import { Account, AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 6000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        const payload = {
          name: user.name,
          email: user.email,
          provider: account?.provider == "google" && "Google",
          profilePic: user.image,
        };
        const res = await fetch(`${AUTH_USER}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        console.log("user:", user);
        console.log("outh:", data);
        user.id = data?.user.id;
        user.token = data?.user.token;
        return true;
      } catch (error) {
        console.log("The user data is", error);
        console.log("The user data is", user);
        console.log("The user data is", account);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
};
