import { create } from "zustand";
import ky from "@toss/ky";
import { CommentFormData } from "@/components/comment/comment";

interface CommentType {
  message: string;
  code: number;
  data: CommentData;
}

interface CommentData {
  id: string;
  postId: number;
  userId: number;
  parentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  User: {
    name: string;
  };
}

interface CommentState {
  selectComment?: CommentData | null;
  createComments: (
    formData: CommentFormData,
    token: string | null,
  ) => Promise<void>;
  CommentList: CommentData | CommentData[] | null;
  fetchComments: () => Promise<void>;
  getComment: (id: string) => Promise<void>;
  setList: (list: CommentData[]) => void;
  setSelectComment: (Comment: CommentData) => void;
}

const useCommentStore = create<CommentState>((set, get) => ({
  selectComment: null,
  CommentList: null,

  createComments: async (form: CommentFormData, token: string | null) => {
    try {
      const response = await ky.post(
        `${process.env.NEXT_PUBLIC_SERVER}/comment`,
        form,
      );

      set({ CommentList: response.data });
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  },

  fetchComments: async () => {
    try {
      const response = await ky
        .get(`${process.env.NEXT_PUBLIC_SERVER}/api/comment`)
        .json<CommentType>();
      set({ CommentList: response.data });
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  },

  getComment: async (id: string) => {
    try {
      const response = await ky
        .get(`${process.env.NEXT_PUBLIC_SERVER}/api/comment/id/${id}`)
        .json<CommentType>();
      set({ selectComment: response.data });
    } catch (error) {
      console.error(`Failed to fetch comment with id ${id}`, error);
    }
  },

  setList: (list: CommentData[]) => set({ CommentList: list }),

  setSelectComment: (Comment: CommentData) => set({ selectComment: Comment }),
}));

export default useCommentStore;
