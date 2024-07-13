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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ApiService from "@/lib/fetch";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/auth";
import {
  errorPostToast,
  errorToast,
} from "@/components/errorToast/post/errorToast";
import TiptapComponent from "@/components/tiptaps/TiptapComponent";

const formSchema = z.object({
  title: z.string().min(3, { message: "제목은 최소 3글자가 필요해요" }),
  content: z.string().min(10, { message: "내용은 최소 10글자가 필요해요" }),
  userId: z.number().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const NewPost = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const { user } = useAuthStore();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    if (user) values.userId = user.id;
    const token = localStorage.getItem("access-token");
    if (!token) errorToast("로그인이 필요합니다.");
    try {
      const apiService = new ApiService();
      const response = await apiService.createPost(values, token);

      if (response.statusCode === 201) {
        const data = await response.data;
        router.push(`/post/${data.id}`);
      }
    } catch (error) {
      console.error("Error creating post: ", error);
      errorPostToast();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">새로운 글</h1>
      <TiptapComponent />
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
                  <Textarea
                    placeholder="내용을 작성해주세요"
                    className="border-4 h-80"
                    {...field}
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
