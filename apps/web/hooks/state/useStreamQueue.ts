import { create } from "zustand";

export interface Video {
  id: string;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  userId: string;
  upvotes: number;
  haveUpvoted: boolean;
}

interface StreamData {
  queue: Video[];
  setQueue: (data: Video[]) => void;
}

const useStreamQueue = create<StreamData>((set) => ({
  queue: [],
  setQueue: (data: Video[]) => set({ queue: data }),
}));

export default useStreamQueue;
