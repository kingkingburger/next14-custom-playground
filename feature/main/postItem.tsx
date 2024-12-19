import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FaEye, FaRegSmile, FaThumbsUp } from "react-icons/fa";
import Image from "next/image";
import { ko } from "date-fns/locale";

import defaultThumbnail from "/public/images/default-thumbnail.png";
import { Post } from "@/lib/fetchPost";

// 게시물 항목 컴포넌트
export const PostItem = ({ post }: { post: Post }) => {
  const { id, title, User, viewCount, recommendCount, createdAt } = post;

  return (
    <Link
      href={`/post/${id}`}
      className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105 p-4"
      aria-label={`Read more about ${title}`}
    >
      {/* 이미지 섹션 */}
      <div className="w-full sm:w-16 h-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700">
        <Image
          src={defaultThumbnail}
          alt={title}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* 텍스트 섹션 */}
      <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
        {/* 제목 */}
        <h2 className="text-white text-xl font-semibold truncate hover:text-indigo-400 transition-colors">
          {title}
        </h2>

        {/* 메타 정보 */}
        <div className="mt-2 flex flex-wrap items-center text-gray-400 text-sm space-x-4">
          {User && (
            <div className="flex items-center space-x-1 group">
              <FaRegSmile className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <span className="group-hover:text-indigo-300 transition-colors">
                {User.name}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-1 group">
            <FaEye className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <span className="group-hover:text-indigo-300 transition-colors">
              {viewCount}
            </span>
          </div>
          <div className="flex items-center space-x-1 group">
            <FaThumbsUp className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <span className="group-hover:text-indigo-300 transition-colors">
              {recommendCount}
            </span>
          </div>
        </div>

        {/* 작성 시간 */}
        <div className="mt-2 text-xs text-gray-500">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
            locale: ko,
          })}
        </div>
      </div>
    </Link>
  );
};
