"use client";

import React, { useEffect } from "react";
import useCommentStore from "@/store/commentStore";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import dayjs from "dayjs";

interface commentListComponentProps {
  params: {
    id: string;
  };
}

export const CommentListComponent = ({ params }: commentListComponentProps) => {
  const { commentList, getComments, isLoading, error } = useCommentStore();

  useEffect(() => {
    getComments(+params.id);
  }, []);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (commentList.length === 0) return <p>댓글이 없습니다.</p>;

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-8">
      <h3 className="text-xl font-semibold">댓글</h3>
      {commentList &&
        commentList.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{comment.User.name}</span>
              <div className="text-right">
                <span className="block">
                  {formatDistanceToNow(new Date(comment?.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </span>
                <span className="block text-sm text-gray-500">
                  {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentListComponent;
