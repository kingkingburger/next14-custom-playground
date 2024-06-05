import { create } from "zustand";

interface PostType {
  id?: number;
  title: string;
  content: string;
}

interface PostState {
  selectPost?: PostType | null;
  postList: PostType[] | null;
  fetchPosts: () => Promise<void>;
  getPost: (id: number) => Promise<void>;
  setList: (list: PostType[]) => void;
  setSelectPost: (post: PostType) => void;
}

const usePostStore = create<PostState>((set, get) => ({
  selectPost: null,
  postList: null,

  fetchPosts: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const postResultList = await response.json();
    set({ postList: postResultList });
  },

  fetchPost: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const postResult = await response.json();
    set({ selectPost: postResult });
  },

  getPost: async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/post/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    const postResult = await response.json();
    set({ selectPost: postResult });
  },

  setList: (list: PostType[]) => set({ postList: list }),

  setSelectPost: (post: PostType) => set({ selectPost: post }),
}));

export default usePostStore;
