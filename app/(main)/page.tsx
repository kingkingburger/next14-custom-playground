// page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import usePostStore from "@/store/postStore";
import LoadingSpinner from "@/components/loading-spinner";

export interface PostType {
  id: string;
  title: string;
  content: string;
}
export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchPosts, postList } = usePostStore();
  const hasFetchedData = useRef(false); // useRef로 fetchData 호출 상태를 저장

  useEffect(() => {
    console.log("useEffect called");

    if (hasFetchedData.current) return; // fetchData가 이미 호출되었으면 종료
    hasFetchedData.current = true; // fetchData 호출 상태 업데이트

    const fetchData = async () => {
      console.log("fetchData called");
      setIsLoading(true);
      try {
        await fetchPosts();
        setIsClient(true);
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isClient || isLoading) {
    return <LoadingSpinner />; // 로딩 중일 때 표시할 내용
  }

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
