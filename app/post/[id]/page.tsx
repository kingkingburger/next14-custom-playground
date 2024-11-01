"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FaEye } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import CommentInputComponent from "@/components/comment/commentInput";
import CommentListComponent from "@/components/comment/commentList";
import PostLoading from "@/app/post/loading";
import { NotHavePost } from "@/components/post/noHavePost";
import { payload } from "@/store/auth/type";
import { useCurrentUserInfo } from "@/lib/current-profile";
import { useAuthStore } from "@/store/auth/auth";
import { Post, postApi } from "@/lib/fetchPost";
import { errorToast } from "@/components/errorToast/post/errorToast";
import { useUserStore } from "@/store/user/userStore";

interface PostIdPageProps {
  params: { id: string };
}

export default function PostIdPageClient({ params }: PostIdPageProps) {
  const { isAuthenticated } = useAuthStore();
  const { id: userId } = useUserStore();
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<payload | null>(null);
  // 유저정보 가져오기
  useCurrentUserInfo(setUserInfo, isAuthenticated);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = params.id;
        const postResult = await postApi.getPostById(postId);
        await postApi.incrementViewCount(postId);
        setPost(postResult.data);
        const checkRecommend = await postApi.checkRecommendation(
          postId,
          userId,
        );
        console.log("checkRecommend = ", checkRecommend);
        // setIsLiked(checkRecommend);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  const handleLikeClick = async () => {
    if (!userInfo) {
      errorToast("로그인이 필요합니다.");
      return;
    }
    const updateRecommendationResult = await postApi.updateRecommendation(
      params.id,
      userInfo.userId,
      "increase",
    );
    console.log("updateRecommendationResult = ", updateRecommendationResult);
    const postResult = await postApi.getPostById(params.id);
    setPost(postResult.data);

    if (postResult.data) {
      setIsLiked(!isLiked);
    }
  };

  if (loading) return <PostLoading />;
  if (!post) return <NotHavePost />;

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="text-right text-gray-400">
            <div>ID: {post.User.name}</div>
            <div className="text-sm text-gray-500">
              {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={handleLikeClick}
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-500 transition-colors duration-200"
              >
                {isLiked ? (
                  <AiFillLike className="text-blue-500" />
                ) : (
                  <AiOutlineLike />
                )}
                <span>{post.recommendCount}</span>
              </button>
              <div className="flex items-center space-x-1">
                <FaEye />
                <span>{post.viewCount}</span>
              </div>
              <span>
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>
          </div>
        </div>

        <div
          className="text-lg text-gray-300"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </main>
      <CommentListComponent params={{ id: post.id }} />
      <CommentInputComponent params={{ id: post.id }} />
    </div>
  );
}
