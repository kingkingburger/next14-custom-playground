"use client";

import React, { useEffect, useState } from "react";
import CommentPage from "@/components/comment/comment";
import usePostStore from "@/store/postStore";
import { useParams } from "next/navigation";

export default function PostIdPageClient() {
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const { getPost, selectPost } = usePostStore();

  useEffect(() => {
    setIsClient(true);
    console.log("params?.id = ", params?.id);
    getPost(params?.id as string);
  }, []);

  if (!isClient) {
    return null; // 클라이언트에서만 랜더링할 내용이 있다면 여기를 사용
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <h1 className="text-4xl font-bold mb-4 text-white">
          {selectPost?.title}
        </h1>
        <div className="flex justify-between items-center mb-4 text-gray-400">
          <span>ID: {selectPost?.id}</span>
          <span>{selectPost?.createdDate}</span>
        </div>
        <div className="text-lg text-gray-300">{selectPost?.content}</div>
      </main>
      <CommentPage />
    </div>
  );
}
