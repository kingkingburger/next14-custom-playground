import { FormData } from "@/app/new-post/page";
import { revalidatePath, revalidateTag } from "next/cache";

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

export interface UserData {
  id: number;
  email: string;
  password: string;
  name: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
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

  public async createPost(values: FormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
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
