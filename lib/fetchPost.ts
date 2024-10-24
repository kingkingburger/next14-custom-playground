import { FormData } from "@/app/new-post/page";
import { UserData } from "@/store/user/userType";
import ky from "@toss/ky";

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

const serverUrl = process.env.NEXT_PUBLIC_SERVER || "";

export async function fetchPosts(): Promise<PostResult<PostData[]>> {
  try {
    const data = await ky
      .get(`${serverUrl}/posts`)
      .json<PostResult<PostData[]>>();
    return data;
  } catch (error: any) {
    console.error("Failed to fetch posts:", error.message);
    throw error;
  }
}

export async function createPost(
  values: FormData,
  token: string | null,
): Promise<PostResult<PostData>> {
  try {
    const data = await ky
      .post(`${serverUrl}/posts`, {
        json: values,
        headers: { authorization: `Bearer ${token}` },
      })
      .json<PostResult<PostData>>();
    return data;
  } catch (error: any) {
    console.error("Failed to create post:", error.message);
    throw error;
  }
}

export async function getPostById(id: string): Promise<PostResult<PostData>> {
  try {
    const data = await ky
      .get(`${serverUrl}/posts/id/${id}`)
      .json<PostResult<PostData>>();
    await viewCountUp(id);
    return data;
  } catch (error: any) {
    console.error("Failed to fetch post:", error.message);
    throw error;
  }
}

export async function viewCountUp(id: string): Promise<void> {
  try {
    await ky.put(`${serverUrl}/posts/count/up/id/${id}`);
  } catch (error: any) {
    console.error("Failed to increment view count:", error.message);
    throw error;
  }
}

export async function recommendCountChange(
  id: string,
  userId: number,
  status: string,
): Promise<void> {
  try {
    await ky.put(
      `${serverUrl}/posts/recommendCount/id/${id}/userId/${userId}/status/${status}`,
    );
  } catch (error: any) {
    console.error("Failed to change recommend count:", error.message);
    throw error;
  }
}
