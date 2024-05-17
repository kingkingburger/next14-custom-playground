import { randomUUID } from "node:crypto";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";

interface PostType {
  id: string;
  title: string;
  content: string;
}

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/post`, {});

  const postContent: PostType[] = (await response?.json()) || [];

  return (
    <div className="relative p-24 min-h-screen">
      {/* 버튼 컨테이너 */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link
          href="/new-post"
          className="bg-teal-500 text-white px-4 py-2 rounded transition transform hover:bg-teal-400 hover:scale-105 hover:shadow-lg"
        >
          글작성
        </Link>
        <ModeToggle />
      </div>
      <div className="flex flex-col space-y-4">
        {postContent.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`} passHref>
            <div className="p-4 bg-white border border-gray-200 rounded shadow transition transform hover:bg-blue-100 hover:scale-105 hover:shadow-xl">
              <h2 className="text-gray-800">{post.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
