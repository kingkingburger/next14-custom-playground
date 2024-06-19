import { FormData } from "@/app/new-post/page";

interface PostType {
  message: string;
  code: number;
  data: PostData | PostData[];
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

  public async fetchPosts(): Promise<PostData[]> {
    try {
      const response = await fetch(`${this.serverUrl}/api/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
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

  public async createPost(values: FormData) {
    try {
      console.log("동작함");
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
}

export default ApiService;
