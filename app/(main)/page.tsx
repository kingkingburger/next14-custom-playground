// pages.tsx

import Link from "next/link";
import ApiService from "@/lib/fetch";
import { formatDistanceToNow } from "date-fns";

export default async function Home() {
  const apiService = new ApiService();
  const postResultList = await apiService.fetchPosts();

  const typedPostList = postResultList.data;

  return (
    <div className="bg-gray-900 p-4 min-h-screen flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-white p-4">전체 인기글</h1>
        <main className="flex flex-col p-4 space-y-4">
          {typedPostList?.map((post) => (
            <Link key={post.id} href={`post/${post.id}`} passHref>
              <div className="bg-gray-800 p-4 rounded shadow transition transform hover:bg-gray-700 hover:scale-105 flex space-x-4">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-white font-bold">{post.title}</h2>
                    <p className="text-gray-400">
                      {post.userId} ·{" "}
                      {formatDistanceToNow(new Date(post.createdAt))}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <span className="mx-2">{post.viewCount} 조회수</span>
                    <span className="mx-2">{post.recommendedCount} 좋아요</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
