"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import usePostStore from "@/store/postStore";

export interface PostType {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { fetchPosts, getPost, postList, selectPost } = usePostStore();

  useEffect(() => {
    setIsClient(true);
    fetchPostsAsync(); // 비동기 함수 호출
  }, []);

  const fetchPostsAsync = async () => {
    await fetchPosts();
  };

  if (!isClient) {
    return null; // 클라이언트 에서만 랜더링할 내용이 있다면 여기를 사용
  }

  // postList가 PostType[] 타입임을 명시
  const typedPostList = postList as PostType[];

  return (
    <div className="bg-gray-900 p-4">
      <main className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
        {typedPostList?.map((post) => (
          <Link key={post.id} href={`post/${post.id}`} passHref>
            <div className="bg-gray-800 p-4 rounded shadow transition transform hover:bg-gray-700 hover:scale-105 h-48">
              <h2 className="text-white font-bold line-clamp-4 whitespace-pre-line">
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
