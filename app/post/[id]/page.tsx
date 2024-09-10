"use client";

import React, { useState, useEffect } from "react";
import ApiService, { PostData } from "@/lib/fetch";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FaEye } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import CommentInputComponent from "@/components/comment/commentInput";
import CommentListComponent from "@/components/comment/commentLIst";

interface PostIdPageProps {
  params: { id: string };
}

export default function PostIdPageClient({ params }: PostIdPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiService = new ApiService();
        const postResult = await apiService.getPostById(params.id);
        setPost(postResult.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.id]);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    const apiService = new ApiService();
    await apiService.recommendCountChange(params.id, "up");
    // Here you would typically also send a request to your backend to update the like status
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (!post) return <div className="text-white">Post not found</div>;

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-white">{post.title}</h1>
          <div className="text-right">
            <div className="text-gray-400 mb-2">ID: {post.User.name}</div>
            <div className="flex items-center justify-end space-x-2 text-gray-400">
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
            <div className="text-sm text-gray-500 mt-1">
              {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
            </div>
            <button
              onClick={handleLikeClick}
              className="flex items-center space-x-1 text-gray-300 hover:text-blue-500 transition-colors duration-200 mt-2 ml-auto"
            >
              {isLiked ? (
                <AiFillLike className="text-blue-500" />
              ) : (
                <AiOutlineLike />
              )}
              <span>좋아요</span>
            </button>
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
