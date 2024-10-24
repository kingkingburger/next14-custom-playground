import ky from "@toss/ky";

// Types
export interface ApiResponse<T> {
  statusCode: number;
  timestamp: Date;
  data: T;
}

export interface Post {
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
  User: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  userId: number;
  categoryId?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER || "";
const POSTS_ENDPOINT = `${API_BASE_URL}/posts`;

class PostApiClient {
  private readonly kyInstance;

  constructor() {
    this.kyInstance = ky.create({
      prefixUrl: API_BASE_URL,
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
              error.message =
                data.message || "요청 처리 중 오류가 발생했습니다.";
            }
            return error;
          },
        ],
      },
    });
  }

  // 게시글 목록 조회
  async getPosts(): Promise<ApiResponse<Post[]>> {
    try {
      return await this.kyInstance.get("posts").json<ApiResponse<Post[]>>();
    } catch (error) {
      console.error("게시글 목록 조회 실패:", error);
      throw error;
    }
  }

  // 게시글 검색
  async searchPosts(searchQuery: string): Promise<ApiResponse<Post[]>> {
    try {
      return await this.kyInstance
        .get("posts", {
          searchParams: { search: searchQuery },
        })
        .json<ApiResponse<Post[]>>();
    } catch (error) {
      console.error("게시글 검색 실패:", error);
      throw error;
    }
  }

  // 게시글 상세 조회
  async getPostById(id: string): Promise<ApiResponse<Post>> {
    try {
      const post = await this.kyInstance
        .get(`posts/${id}`)
        .json<ApiResponse<Post>>();

      // 조회수 증가 (비동기로 처리)
      this.incrementViewCount(id).catch(console.error);

      return post;
    } catch (error) {
      console.error("게시글 상세 조회 실패:", error);
      throw error;
    }
  }

  // 게시글 작성
  async createPost(
    data: CreatePostData,
    token: string,
  ): Promise<ApiResponse<Post>> {
    try {
      return await this.kyInstance
        .post("posts", {
          json: data,
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<ApiResponse<Post>>();
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      throw error;
    }
  }

  // 조회수 증가
  private async incrementViewCount(id: string): Promise<void> {
    try {
      await this.kyInstance.put(`posts/${id}/views`);
    } catch (error) {
      console.error("조회수 증가 실패:", error);
      throw error;
    }
  }

  // 게시글 추천
  async updateRecommendation(
    postId: string,
    userId: number,
    action: "increase" | "decrease",
  ): Promise<void> {
    try {
      await this.kyInstance.put(`posts/${postId}/recommendations`, {
        searchParams: {
          userId,
          action,
        },
      });
    } catch (error) {
      console.error("게시글 추천 상태 변경 실패:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const postApi = new PostApiClient();
