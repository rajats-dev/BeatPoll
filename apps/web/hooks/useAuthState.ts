import { create } from "zustand";
import { SingInFlow } from "../features/auth/types";

interface AuthStatePage {
  pageState: string;
  setPageState: (page: SingInFlow) => void;
}

const useAuthState = create<AuthStatePage>((set) => ({
  pageState: "signUp",
  setPageState: (page: SingInFlow) => set({ pageState: page }),
}));

export default useAuthState;
