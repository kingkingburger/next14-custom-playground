// pages.tsx

import Link from "next/link";
import ApiService, { PostData, PostResult } from "@/lib/fetch";

export default async function Home() {
  const apiService = new ApiService();
  const postResultList = await apiService.fetchPosts();

  const typedPostList = postResultList.data;

  return (
    <div className="bg-gray-900 p-4 min-h-screen">
      <h1 className="text-white p-4">게시판</h1>
      <main className="flex flex-wrap gap-4 p-4">
        {typedPostList?.map((post) => (
          <Link key={post.id} href={`post/${post.id}`} passHref>
            <div className="bg-gray-800 p-4 rounded shadow transition transform hover:bg-gray-700 hover:scale-105 h-48 w-48 flex flex-col justify-between">
              <h2 className="text-white font-bold line-clamp-2 whitespace-pre-line">
                {post.title}
              </h2>
              <p className="text-gray-400 line-clamp-4 whitespace-pre-line">
                {post.content}
              </p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
