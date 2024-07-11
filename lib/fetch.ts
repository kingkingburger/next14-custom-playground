import { FormData } from "@/app/new-post/page";
import { UserData } from "@/store/user/userType";
import axios from "axios";

export interface PostResult<T> {
  statusCode: number;
  timestamp: Date;
  data: T;
}

export interface PostData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  recommendCount: number;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  User: UserData;
}

class ApiService {
  public readonly serverUrl: string;

  constructor() {
    this.serverUrl = process.env.NEXT_PUBLIC_SERVER || "";
  }

  public async fetchPosts(): Promise<PostResult<PostData[]>> {
    try {
      const response = await fetch(`${this.serverUrl}/post/feed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          // revalidate: 2,
          // tags: ["main"],
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Failed to fetch posts:", error.message);
      throw error;
    }
  }

  public async createPost(values: FormData, token: string | null) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/post`,
        values,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch posts:", error.message);
      throw error;
    }
  }

  public async getPostById(id: string): Promise<PostResult<PostData>> {
    try {
      const response = await fetch(`${this.serverUrl}/post/id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        next: {
          // revalidate: 2,
          // tags: ["main"],
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Failed to fetch posts:", error.message);
      throw error;
    }
  }
}

export default ApiService;
