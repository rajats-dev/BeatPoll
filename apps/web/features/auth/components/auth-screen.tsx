"use client";
import SignUpCard from "./sign-up-card";
import useAuthState from "@/hooks/useAuthState";

const AuthScreen = () => {
  const { pageState, setPageState } = useAuthState();

  return (
    <div className="h-full flex items-center justify-center">
      <div className="h-auto md:w-[420px]">
        <SignUpCard setState={setPageState} />
      </div>
    </div>
  );
};

export default AuthScreen;
