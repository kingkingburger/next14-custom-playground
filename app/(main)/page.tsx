import { randomUUID } from "node:crypto";
import Link from "next/link";

export default function Home() {
  const postContent = [];
  for (let i = 0; i < 50; i++) {
    postContent.push({
      id: randomUUID(),
      title: randomUUID(),
      content: randomUUID(),
      date: new Date(),
    });
  }

  return (
    <div className="relative p-24 min-h-screen">
      {/* 글작성 버튼 */}
      <Link
        href="/new-post"
        className="absolute top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded transition transform hover:bg-teal-400 hover:scale-105 hover:shadow-lg"
      >
        글작성
      </Link>
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
