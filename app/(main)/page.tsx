import Link from "next/link";

interface PostType {
  id: string;
  title: string;
  content: string;
}

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/post`, {});

  const postContent: PostType[] = (await response?.json()) || [];

  return (
    <div className="p-24 min-h-screen">
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
