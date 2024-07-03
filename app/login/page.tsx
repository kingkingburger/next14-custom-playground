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
  email: z.string().email({ message: "이메일 형식을 입력해주세요" }),
  password: z.string().min(1, { message: "최소 1글자 입력해주세요" }),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );

    if (response.ok) {
      const data = await response.json();
      // 토큰을 localStorage에 저장
      if (data) {
        localStorage.setItem("access-token", data.data.accessToken);
      }
      router.push(`/`);
    } else {
      toast(`로그인 실패`, {
        description: "로그인이 되지 않았습니다 입력정보를 다시 확인해주세요",
        action: {
          label: "확인",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">로그인</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="이메일을 입력해주세요"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    className="border-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">로그인</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
