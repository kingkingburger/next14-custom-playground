"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import usePostStore from "@/store/postStore";

interface CommentComponentProps {
  params: {
    id: string;
  };
}

export const CommentComponent = ({ params }: CommentComponentProps) => {
  const [isClient, setIsClient] = useState(false);
  // const params = useParams();
  const { getPost, selectPost } = usePostStore();

  useEffect(() => {
    setIsClient(true);
    getPost(params?.id as string);
  }, []);

  if (!isClient) {
    return null; // 클라이언트에서만 랜더링할 내용이 있다면 여기를 사용
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <h1 className="text-4xl font-bold mb-4 text-white">
          {/*{postContent.title}*/}
        </h1>
        <div className="flex justify-between items-center mb-4 text-gray-400">
          {/*<span>ID: {postContent.id}</span>*/}
          {/*<span>{new Date(postContent.createdDate).toLocaleDateString()}</span>*/}
        </div>
        <div className="text-lg text-gray-300 mb-6">
          {/*{postContent.content}*/}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Comments</h2>

          <div className="flex items-center mb-4">
            <input
              type="text"
              className="flex-grow p-2 mr-2 rounded bg-gray-700 text-white"
              placeholder="Add a comment..."
              // value={newComment}
              // onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              // onClick={handleAddComment}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
