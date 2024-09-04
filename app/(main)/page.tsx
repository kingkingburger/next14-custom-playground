"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import Image from "next/image";
import thumnail from "/public/images/default-thumnail.png";
import { ko } from "date-fns/locale";
import ApiService, { PostData } from "@/lib/fetch";
import HomeLoading from "@/app/(main)/loading";
import dayjs from "dayjs";

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
    <div className=" flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-3xl">
        <h1 className="text-white text-2xl font-semibold mb-6">전체 인기글</h1>
        <main className="flex flex-col space-y-2">
          {postList.map((post: PostData) => (
            <Link key={post.id} href={`post/${post.id}`} passHref>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:bg-gray-700 hover:scale-105 flex space-x-4">
                <Image
                  src={thumnail}
                  alt={post.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex flex-col justify-between w-full">
                  <h2 className="text-white font-bold text-lg">{post.title}</h2>
                  <div className="flex items-center text-gray-400 mt-2">
                    <div className="mr-2 flex items-center space-x-1">
                      <span>{post.User?.name}</span>
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      <FaEye />
                      <span>{post.viewCount}</span>
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      <FaThumbsUp />
                      <span>{post.recommendCount}</span>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="block">
                        {formatDistanceToNow(new Date(post?.createdAt), {
                          addSuffix: true,
                          locale: ko,
                        })}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
                      </span>
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
