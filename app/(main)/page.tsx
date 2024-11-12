"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import Image from "next/image";
import thumnail from "/public/images/default-thumnail.png";
import { ko } from "date-fns/locale";
import HomeLoading from "@/app/(main)/loading";
import dayjs from "dayjs";
import { Post, postApi } from "@/lib/fetchPost";
import { useUserStore } from "@/store/user/userStore";

export default function HomePage() {
  const { getUser } = useUserStore();

  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // 현재 페이지
  const limit = 10; // 페이지당 게시물 수

  const fetchPostsInComponent = async (pageNumber = 1) => {
    console.log("pageNumber = ", pageNumber);
    try {
      setLoading(true);
      const result = await postApi.getPosts(pageNumber, limit);
      setPostList(result.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      await getUser();
    } catch (error) {
      console.error("Failed to get userInfo:", error);
    }
  };

  useEffect(() => {
    fetchPostsInComponent(page); // 현재 페이지에 대한 게시물 목록 요청
    fetchUserInfo();
  }, [page]);

  if (loading) {
    return <HomeLoading />;
  }

  return (
    <div className="flex justify-center bg-gray-900">
      <div className="w-full max-w-3xl pt-6">
        <h1 className="text-white text-2xl font-semibold mb-6">전체 인기글</h1>
        <main className="flex flex-col space-y-2">
          {postList.map((post: Post) => (
            <Link key={post.id} href={`post/${post.id}`} passHref>
              <div className="bg-gray-800 py-1 px-2 rounded-lg shadow-lg transition-transform transform hover:bg-gray-700 hover:scale-105 flex space-x-4">
                <Image
                  src={thumnail}
                  alt={post.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex flex-col justify-between w-full">
                  <h2 className="text-white font-bold text-lg mt-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-gray-400">
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
        {/* 페이지네이션 버튼 */}
        <div className="flex justify-center space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            이전
          </button>
          <span className="text-white">{page}</span>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={() => setPage((prev) => prev + 1)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
