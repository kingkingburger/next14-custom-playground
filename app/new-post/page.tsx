"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
import TiptapComponent from "@/components/tiptaps/TiptapComponent";
import { useAuthStore } from "@/store/auth/auth";
import {
  errorPostToast,
  errorToast,
} from "@/components/errorToast/post/errorToast";
import { useCurrentUserInfo } from "@/lib/current-profile";
import { payload } from "@/store/auth/type";
import { createPost } from "@/lib/fetchPost";

// Form schema for validation
const formSchema = z.object({
  title: z.string().min(3, { message: "제목은 최소 3글자가 필요해요" }),
  content: z.string().min(10, { message: "내용은 최소 10글자가 필요해요" }),
  userId: z.number().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const NewPost = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useState<string>("");
  const [userInfo, setUserInfo] = useState<payload | null>(null);

  // Setting up form control using Zod resolver
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const { setValue } = form;

  // Mounting hook to prevent SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get current user information when the component mounts
  useCurrentUserInfo(setUserInfo, isAuthenticated);

  // Handle form submission
  const onSubmit = async (values: FormData) => {
    if (userInfo) values.userId = userInfo?.userId;

    const token = localStorage.getItem("access-token");
    if (!token) {
      return errorToast("로그인이 필요합니다.");
    }

    try {
      const response = await createPost(values, token);

      if (response.statusCode === 201) {
        router.push(`/post/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error creating post: ", error);
      errorPostToast();
    }
  };

  // Handle content change for TiptapComponent
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setValue("content", newContent);
  };

  // Avoid rendering on server side
  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">새로운 글</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input
                    placeholder="제목을 입력해주세요"
                    className="border-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <TiptapComponent
                    content={content}
                    onChange={handleContentChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPost;
