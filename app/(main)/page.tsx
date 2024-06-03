"use client";

import Link from "next/link";
import useStore from "@/store/store";
import { useEffect, useState } from "react";

export interface PostType {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const { count, increaseCount, resetCount } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [postContent, setPostContent] = useState<PostType[]>([]);
  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/post`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        },
      );
      const postResult = await response?.json();
      setPostContent(postResult);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (isClient) {
  //
  //   }
  // }, [isClient]);

  if (!isClient) {
    return null; // 클라이언트 에서만 랜더링할 내용이 있다면 여기를 사용
  }

  return (
    <div className="bg-gray-900  p-4">
      <div>
        <h1>Count: {count}</h1>
        <button onClick={increaseCount}>Increase Count</button>
        <button onClick={resetCount}>Reset Count</button>
      </div>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {postContent.map((post) => (
          <Link key={post.id} href={`post/${post.id}`} passHref>
            <div className="bg-gray-800 p-4 rounded shadow transition transform hover:bg-gray-700 hover:scale-105">
              <h2 className="text-white font-bold">{post.title}</h2>
              <p className="text-gray-400">{post.content}</p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
