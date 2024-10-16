import { create } from "zustand";
import axios from "axios";

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  parentId: number | null;
  User: {
    name: string;
  };
  createdAt: string;
  replies?: Comment[];
}

interface CommentStore {
  commentList: Comment[];
  isLoading: boolean;
  error: string | null;
  getComments: (postId: number) => Promise<void>;
  createComment: (comment: Partial<Comment>, token: string) => Promise<void>;
  createReply: (
    reply: Partial<Comment>,
    parentId: number,
    token: string,
  ) => Promise<void>;
  deleteComment: (commentId: number, token: string) => Promise<void>;
}

const useCommentStore = create<CommentStore>((set) => ({
  commentList: [],
  isLoading: false,
  error: null,

  getComments: async (postId: number) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/comment/postId/${postId}`,
      );
      const comments = response.data;
      set({ commentList: comments.data, isLoading: false });
    } catch (error) {
      set({ error: "댓글을 불러오는 데 실패했습니다.", isLoading: false });
    }
  },

  createComment: async (comment: Partial<Comment>, token: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/comment`,
        comment,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.log("error = ", error);
      set({ error: "댓글 작성에 실패했습니다." });
    }
  },

  createReply: async (
    reply: Partial<Comment>,
    parentId: number,
    token: string,
  ) => {
    try {
      const response = await axios.post(
        "/api/comments",
        { ...reply, parentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const newReply = response.data;
      set((state) => {
        const updateReplies = (comments: Comment[]): Comment[] => {
          return comments.map((comment) => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply],
              };
            } else if (comment.replies) {
              return {
                ...comment,
                replies: updateReplies(comment.replies),
              };
            }
            return comment;
          });
        };

        return { commentList: updateReplies(state.commentList) };
      });
    } catch (error) {
      set({ error: "대댓글 작성에 실패했습니다." });
    }
  },

  deleteComment: async (commentId: number, token: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/comment/id/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.log("error = ", error);
      set({ error: "댓글 작성에 실패했습니다." });
    }
  },
}));

export default useCommentStore;
