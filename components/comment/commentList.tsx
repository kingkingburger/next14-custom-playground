"use client";

import React, { useEffect, useState } from "react";
import useCommentStore from "@/store/commentStore";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import dayjs from "dayjs";
import { NotHaveComment } from "@/components/comment/notHaveComment";
import { errorToast } from "@/components/errorToast/post/errorToast";
import ConfirmModal from "@/components/modal/confirmModal";

interface commentListComponentProps {
  params: {
    id: string;
  };
}

export const CommentListComponent = ({ params }: commentListComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );

  const { commentList, getComments, isLoading, error, deleteComment } =
    useCommentStore();

  useEffect(() => {
    getComments(+params.id);
  }, []);

  const openModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCommentId(null);
  };

  const handleDelete = async () => {
    if (selectedCommentId !== null) {
      const token = localStorage.getItem("access-token");
      if (!token) {
        errorToast("로그인이 필요합니다.");
        closeModal();
        return;
      }
      await deleteComment(selectedCommentId, token);
      await getComments(+params.id);
      closeModal();
    }
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (commentList.length === 0) return <NotHaveComment />;

  // TODO 백엔드에서 create, delete 할 때 오는 객체들 통일 하기
  return (
    <div className="space-y-4 max-w-2xl mx-auto p-8">
      <h3 className="text-xl font-semibold">댓글</h3>
      {commentList &&
        commentList.map((comment, index) => (
          <div key={`${comment.id}-${index}`} className="p-4 border rounded-md">
            <div className="mb-2 flex justify-between items-start">
              <div>
                {/* User 객체가 존재하는지 먼저 확인 */}
                <span className="font-bold">
                  {comment.User ? comment.User.name : "알 수 없는 사용자"}
                </span>
              </div>
              <div className="flex justify-end items-baseline space-x-2 flex-wrap">
                {comment.createdAt ? (
                  <>
                    <div className="text-sm text-gray-500">
                      {dayjs(comment.createdAt).isValid()
                        ? dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm")
                        : "알 수 없는 날짜"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {dayjs(comment.createdAt).isValid()
                        ? formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                            locale: ko,
                          })
                        : ""}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">알 수 없는 날짜</div>
                )}
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => openModal(comment.id)}
                >
                  삭제
                </button>
              </div>
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      {isModalOpen && (
        <ConfirmModal
          message="정말로 이 댓글을 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default CommentListComponent;
