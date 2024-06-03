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

const formSchema = z.object({
  title: z.string().min(5, { message: "제목은 최소 5글자가 필요해요" }),
  content: z.string().min(10, { message: "내용은 최소 10글자가 필요해요" }),
});

type FormData = z.infer<typeof formSchema>;

const errorToast = toast(`게시글이 생성되지 않았습니다.`, {
  description: "게시글이 생성 에러",
  action: {
    label: "확인",
    onClick: () => console.log("Undo"),
  },
});

const NewPost = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    // TODO: [🟥고민필요] 글쓰기는 로그인 안한사람도 가능하게끔 수정
    // const token = localStorage.getItem("token");
    // if (token) {
    //   errorToast;
    // }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/api/post/id/${data.id}`);
    } else {
      errorToast;
    }
  };

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
