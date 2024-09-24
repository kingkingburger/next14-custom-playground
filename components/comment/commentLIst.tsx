"use client";

import React, { useEffect } from "react";
import useCommentStore from "@/store/commentStore";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import dayjs from "dayjs";
import { NotHaveComment } from "@/components/comment/notHaveComment";

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
  if (commentList.length === 0) return <NotHaveComment />;

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-8">
      <h3 className="text-xl font-semibold">댓글</h3>
      {commentList &&
        commentList.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-md">
            <div className="mb-2 flex justify-between items-start">
              <div>
                <span className="font-bold">{comment.User.name}</span>
              </div>
              <div className="flex justify-end items-baseline space-x-2 flex-wrap">
                <div className="text-sm text-gray-500">
                  {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm")}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
                </div>
                <div className="mt-2">댓글</div>
              </div>
            </div>
            <hr className="my-3" />
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentListComponent;
