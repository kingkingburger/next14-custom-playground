"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import Image from "next/image";
import thumnail from "/public/images/default-thumnail.png";
import { ko } from "date-fns/locale";
import ApiService, { PostData } from "@/lib/fetch";
import HomeLoading from "@/app/(main)/loading";

const apiService = new ApiService();

export default function HomePage() {
  const [postList, setPostList] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const result = await apiService.fetchPosts();
      setPostList(result.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 페이지가 포커스를 받을 때마다 데이터를 새로 가져옵니다.
  useEffect(() => {
    const handleFocus = () => {
      fetchPosts();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [postList]);

  if (loading) {
    return <HomeLoading />;
  }

  return (
    <div className="p-4 min-h-screen flex justify-center bg-gray-900">
      <div className="w-full max-w-3xl">
        <h1 className="text-white p-4">전체 인기글</h1>
        <main className="flex flex-col p-4 space-y-4">
          {postList.map((post: PostData) => (
            <Link key={post.id} href={`post/${post.id}`} passHref>
              <div className="bg-gray-800 p-2 rounded shadow transition transform hover:bg-gray-700 hover:scale-105 flex space-x-4">
                <Image
                  src={thumnail}
                  alt={post.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex flex-col justify-between">
                  <h2 className="text-white font-bold">{post.title}</h2>
                  <div className="flex items-center text-gray-400">
                    <div className="mx-2 flex items-center space-x-1">
                      {post.User?.name}
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      <FaEye />
                      <span>{post.viewCount}</span>
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      <FaThumbsUp />
                      <span>{post.recommendCount}</span>
                    </div>
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
