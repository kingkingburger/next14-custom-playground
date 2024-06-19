import { FormData } from "@/app/new-post/page";
import { revalidatePath, revalidateTag } from "next/cache";

export interface PostResult<T> {
  message: string;
  code: number;
  data: T;
}

export interface PostData {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}
class ApiService {
  public readonly serverUrl: string;

  constructor() {
    this.serverUrl = process.env.NEXT_PUBLIC_SERVER || "";
  }

  public async fetchPosts(): Promise<PostResult<PostData[]>> {
    try {
      const response = await fetch(`${this.serverUrl}/api/post`, {
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

  public async createPost(values: FormData) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        },
      );

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
      const response = await fetch(`${this.serverUrl}/api/post/id/${id}`, {
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
