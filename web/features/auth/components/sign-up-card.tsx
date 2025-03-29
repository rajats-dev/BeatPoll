import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { usePathname } from "next/navigation";

const SignUpCard = () => {
  const pathname = usePathname();
  const [isLoading, setloading] = useState(false);

  const handleGoogleLogin = async () => {
    setloading(true);
    if (pathname.startsWith("/client/creator")) {
      await signIn("google");
    } else {
      await signIn("google", {
        redirect: true,
        callbackUrl: "/client",
      });
    }
    setloading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 w-full">
        <button
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center h-full justify-center gap-4 bg-emerald-800 p-6 rounded-lg text-white"
        >
          <FcGoogle className="my-auto" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpCard;
