"use client";

import { useEffect, useState } from "react";
import useCommentStore from "@/store/commentStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  errorPostToast,
  errorToast,
} from "@/components/errorToast/post/errorToast";
import ApiService from "@/lib/fetch";
import { payload } from "@/store/auth/type";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/auth";

interface CommentComponentProps {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  content: z.string(),
  userId: z.number().optional(),
  postId: z.number().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const CommentComponent = ({ params }: CommentComponentProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState<string>("");
  const [userInfo, setUserInfo] = useState<payload | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { createComments } = useCommentStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    if (userInfo) values.userId = userInfo?.userId;
    const token = localStorage.getItem("access-token");
    if (!token) errorToast("로그인이 필요합니다.");

    try {
      await createComments(values, token);

      // if (response.statusCode === 201) {
      //
      // }
    } catch (error) {
      console.error("Error creating post: ", error);
      errorPostToast();
    }
  };

  if (!isMounted) {
    return null;
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
