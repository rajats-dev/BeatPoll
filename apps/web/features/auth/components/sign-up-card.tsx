import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { SingInFlow } from "../types";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

interface SignUpCardProps {
  setState: (state: SingInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [isLoading, setloading] = useState(false);

  const handleGoogleLogin = async () => {
    setloading(true);
    await signIn("google", {
      redirect: true,
      callbackUrl: "/client",
    });
    setloading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 w-full">
        <button
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="w-full relative border-s border-2 border-black"
        >
          <FcGoogle className="size-5 absolute left-2" />
          Continue with Google
        </button>

        <div>
          <p className="text-sm text-muted-foreground pt-10">
            Already have an account?{" "}
            <span
              className="text-sky-700 hover:underline cursor-pointer"
              onClick={() => setState("signIn")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
