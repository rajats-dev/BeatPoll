"use client";
import SignUpCard from "./sign-up-card";
import useAuthState from "@/hooks/useAuthState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";

const AuthScreen = () => {
  const { pageState, setPageState } = useAuthState();

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type == "auth";

  return (
    // <div className="h-full flex items-center justify-center">
    //   <div className="h-auto md:w-[420px]">
    //     <SignUpCard setState={setPageState} />
    //   </div>
    // </div>

    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Sign up to continue</DialogTitle>
        </DialogHeader>
        <SignUpCard setState={setPageState} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthScreen;
