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
import { useAuthStore } from "@/store/auth/auth";
import { useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/user/userStore";

const formSchema = z.object({
  email: z.string().email({ message: "이메일 형식을 입력해주세요" }),
  password: z.string().min(1, { message: "최소 1글자 입력해주세요" }),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { signIn, isAuthenticated } = useAuthStore();
  const { getUser } = useUserStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: FormData) => {
    await signIn(values);
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
          <div className="flex justify-end">
            <Button type="submit" className="items-end">
              로그인
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-4 text-center">
        <span className="text-white">계정이 없으신가요? </span>
        <Link href="/sign-up" className="text-teal-500 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
