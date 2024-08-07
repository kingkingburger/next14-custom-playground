import { create } from "zustand";

interface CommentType {
  message: string;
  code: number;
  data: CommentData;
}

interface CommentData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentState {
  selectComment?: CommentData | null;
  CommentList: CommentData | CommentData[] | null;
  fetchComments: () => Promise<void>;
  getComment: (id: string) => Promise<void>;
  setList: (list: CommentData[]) => void;
  setSelectComment: (Comment: CommentData) => void;
}

const useCommentStore = create<CommentState>((set, get) => ({
  selectComment: null,
  CommentList: null,

  fetchComments: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/Comment`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    const CommentResultList = await response.json();
    set({ CommentList: CommentResultList.data });
  },

  getComment: async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/Comment/id/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    const CommentResult = (await response.json()) as CommentType;
    set({ selectComment: CommentResult.data });
  },

  setList: (list: CommentData[]) => set({ CommentList: list }),

  setSelectComment: (Comment: CommentData) => set({ selectComment: Comment }),
}));

export default useCommentStore;
