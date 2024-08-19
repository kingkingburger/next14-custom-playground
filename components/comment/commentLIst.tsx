"use client";

import React, { useEffect } from "react";
import useCommentStore from "@/store/commentStore";

interface commentListComponentProps {
  postId: number;
}

export const CommentListComponent = ({ postId }: commentListComponentProps) => {
  const { commentList, getComments, isLoading, error } = useCommentStore();

  useEffect(() => {
    getComments(postId);
  }, []);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (commentList.length === 0) return <p>댓글이 없습니다.</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">댓글 목록</h3>
      {Array.isArray(commentList) &&
        commentList.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{comment.User.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentListComponent;
