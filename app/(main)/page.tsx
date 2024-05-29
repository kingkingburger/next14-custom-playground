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
    <div className="bg-gray-900 min-h-screen p-4">
      <header className="text-white flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">MHBaord</h1>
        <div className="flex space-x-4"></div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {postContent.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`} passHref>
            <div className="bg-gray-800 p-4 rounded shadow transition transform hover:bg-gray-700 hover:scale-105">
              <h2 className="text-white font-bold">{post.title}</h2>
              <p className="text-gray-400">{post.content}</p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
