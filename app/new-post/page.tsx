"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().min(5, { message: "제목은 최소 5글자가 필요해요" }),
  content: z.string().min(10, { message: "내용은 최소 10글자가 필요해요" }),
});

type FormData = z.infer<typeof schema>;

const NewPost = () => {
  useForm<FormData>({ resolver: zodResolver(schema) });
};
