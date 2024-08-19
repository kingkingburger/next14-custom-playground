import { create } from "zustand";
import ky from "@toss/ky";
import { CommentFormData } from "@/components/comment/commentInput";

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
  commentList: CommentData[];
  isLoading: boolean;
  error: string | null;
  createComment: (
    formData: CommentFormData,
    token: string | null,
  ) => Promise<void>;
  getComments: (postId: number) => Promise<void>;
  setCommentList: (list: CommentData[]) => void;
}

const useCommentStore = create<CommentState>((set, get) => ({
  commentList: [],
  isLoading: false,
  error: null,

  createComment: async (form: CommentFormData, token: string | null) => {
    set({ isLoading: true, error: null });
    try {
      const response = await ky
        .post(`${process.env.NEXT_PUBLIC_SERVER}/comment`, { json: form })
        .json<{ data: CommentData }>();

      set((state) => ({
        commentList: [...state.commentList, response.data],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to create comment", error);
      set({ error: "댓글 생성에 실패했습니다.", isLoading: false });
    }
  },

  getComments: async (postId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await ky
        .get(`${process.env.NEXT_PUBLIC_SERVER}/comment/postId/${postId}`)
        .json<{ data: CommentData[] }>();
      set({ commentList: response.data, isLoading: false });
    } catch (error) {
      console.error(`Failed to fetch comments for post ${postId}`, error);
      set({ error: "댓글을 불러오는데 실패했습니다.", isLoading: false });
    }
  },

  setCommentList: (list: CommentData[]) => set({ commentList: list }),
}));

export default useCommentStore;
