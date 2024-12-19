"use client";

import React, { useEffect, useState } from "react";
import HomeLoading from "@/app/(main)/loading";
import { Post, postApi } from "@/lib/fetchPost";
import { useUserStore } from "@/store/user/userStore";
import CustomPagination from "@/components/paging/customPagination";
import { PostItem } from "@/feature/main/postItem";

export default function HomePage() {
  const { getUser } = useUserStore();

  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const limit = 7; // 페이지당 게시물 수
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (pageNumber: number = 1) => {
    try {
      setLoading(true);
      const result = await postApi.getPostList(pageNumber, limit);
      setPostList(result.data.data);
      setTotalItems(result.data.total);
      setError(null);
    } catch (err) {
      console.error("게시물 불러오기 실패:", err);
      setError("게시물을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      await getUser();
    } catch (err) {
      console.error("사용자 정보 불러오기 실패:", err);
      setError("사용자 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchPosts(page);
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading) {
    return <HomeLoading />;
  }

  return (
    <div className="flex justify-center bg-gray-900 min-h-screen p-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">
          전체 인기글
        </h1>
        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-6 text-center">
            {error}
          </div>
        )}
        <main className="grid gap-6">
          {postList.length > 0 ? (
            postList.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <p className="text-gray-400 text-center">게시물이 없습니다.</p>
          )}
        </main>
        {/* 페이지네이션 */}
        <div className="flex justify-center mt-8">
          <CustomPagination
            currentPage={page}
            totalItems={totalItems}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
