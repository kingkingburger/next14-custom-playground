"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/auth";
import useCommentStore from "@/store/commentStore";
import {
  errorPostToast,
  errorToast,
} from "@/components/errorToast/post/errorToast";
import { payload } from "@/store/auth/type";
import { useCurrentUserInfo } from "@/lib/current-profile";

const formSchema = z.object({
  content: z.string().optional(),
  userId: z.number().optional(),
  postId: z.number().optional(),
});

export type CommentFormData = z.infer<typeof formSchema>;

interface CommentComponentProps {
  params: {
    id: string;
  };
}

export const CommentInputComponent = ({ params }: CommentComponentProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [userInfo, setUserInfo] = useState<payload | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { createComment, getComments } = useCommentStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useCurrentUserInfo(setUserInfo, isAuthenticated);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: CommentFormData) => {
    const token = localStorage.getItem("access-token");

    // 로그인 상태 확인
    if (!token) {
      errorToast("로그인이 필요합니다.");

      // 필요 시 로그인 페이지로 리다이렉트
      router.push("/login"); // 로그인 페이지로 이동

      return;
    }

    // 댓글 작성
    try {
      if (userInfo) values.userId = userInfo.userId;
      values.postId = parseInt(params.id, 10);
      values.userId = userInfo?.userId;

      await createComment(values, token);
      await getComments(values.postId);
      router.refresh(); // 댓글 작성 후 페이지를 새로고침하여 변경사항 반영
    } catch (error) {
      console.error("Error creating comment: ", error);
      errorPostToast();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 border">
      <h2 className="text-2xl font-bold mb-6">댓글 작성</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    placeholder="댓글을 입력해주세요"
                    className="border-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">등록</Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentInputComponent;
