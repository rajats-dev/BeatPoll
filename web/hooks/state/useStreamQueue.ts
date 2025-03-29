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
  setQueue: (update: Video[] | ((prevQueue: Video[]) => Video[])) => void;
}

const useStreamQueue = create<StreamData>((set) => ({
  queue: [],
  setQueue: (update) =>
    set((state) => ({
      queue: typeof update === "function" ? update(state.queue) : update,
    })),
}));

export default useStreamQueue;
