/**
 * [24/11/11]
 * lib/fetchPost의 api로 사용하고 있음
 * store를 사용하게 된다면 예시파일로 남겨둔거임
 */

import { create } from "zustand";

interface PostType {
  message: string;
  code: number;
  data: PostData;
}

interface PostData {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}

interface PostState {
  selectPost?: PostData | null;
  postList: PostData | PostData[] | null;
  fetchPosts: () => Promise<void>;
  getPost: (id: string) => Promise<void>;
  setList: (list: PostData[]) => void;
  setSelectPost: (post: PostData) => void;
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
    set({ postList: postResultList.data });
  },

  getPost: async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/post/id/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    const postResult = (await response.json()) as PostType;
    set({ selectPost: postResult.data });
  },

  setList: (list: PostData[]) => set({ postList: list }),

  setSelectPost: (post: PostData) => set({ selectPost: post }),
}));

export default usePostStore;
