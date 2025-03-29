"use client";
import SignUpCard from "./sign-up-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";

const AuthScreen = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type == "auth";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Sign up to continue</DialogTitle>
        </DialogHeader>
        <SignUpCard />
      </DialogContent>
    </Dialog>
  );
};

export default AuthScreen;
