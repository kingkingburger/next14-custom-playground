"use client";

import React, { useEffect } from "react";
import useCommentStore from "@/store/commentStore";

interface CommentListComponentProps {
  postId: number;
}

export const CommentListComponent = ({ postId }: CommentListComponentProps) => {
  const { CommentList, fetchComments, setList } = useCommentStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
      const filteredComments = Array.isArray(CommentList)
        ? CommentList.filter((comment) => comment.postId === postId)
        : [];
      setList(filteredComments);
    };

    fetchData();
  }, [fetchComments, postId, setList]);

  if (
    !CommentList ||
    (Array.isArray(CommentList) && CommentList.length === 0)
  ) {
    return <p>댓글이 없습니다.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">댓글 목록</h3>
      {Array.isArray(CommentList) &&
        CommentList.map((comment) => (
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
