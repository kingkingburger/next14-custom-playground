import { create } from "zustand";
import ky from "@toss/ky";

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
  createComment: (comment: Partial<Comment>) => Promise<void>;
  createReply: (
    reply: Partial<Comment>,
    parentId: number,
    token: string,
  ) => Promise<void>;
  deleteComment: (commentId: number, token: string) => Promise<void>;
}

const api = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER}/comment`,
  hooks: {
    beforeRequest: [
      (request: any) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async (error: any) => {
        const { response } = error;
        if (response) {
          const data = await response.json();
          error.message = data.message || "요청 처리 중 오류가 발생했습니다.";
        }
        return error;
      },
    ],
  },
});

const useCommentStore = create<CommentStore>((set) => ({
  commentList: [],
  isLoading: false,
  error: null,

  getComments: async (postId: number) => {
    set({ isLoading: true });
    try {
      const response = await api
        .get(`postId/${postId}`)
        .json<{ data: Comment[] }>();
      set({ commentList: response.data, isLoading: false });
    } catch (error) {
      set({ error: "댓글을 불러오는 데 실패했습니다.", isLoading: false });
    }
  },

  createComment: async (comment: Partial<Comment>) => {
    try {
      await api.post("", { json: comment });
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
      const newReply = await api
        .create({
          headers: { Authorization: token },
        })
        .post("api/comments", { json: { ...reply, parentId } })
        .json<Comment>();

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
      await api
        .create({
          headers: { Authorization: token },
        })
        .delete(`id/${commentId}`);
    } catch (error) {
      console.log("error = ", error);
      set({ error: "댓글 작성에 실패했습니다." });
    }
  },
}));

export default useCommentStore;
