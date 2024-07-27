import Link from "next/link";
import ApiService, { PostData, PostResult } from "@/lib/fetch";
import { formatDistanceToNow } from "date-fns";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import Image from "next/image";
import thumnail from "/public/images/default-thumnail.png";
import { ko } from "date-fns/locale";

async function getPosts() {
  const apiService = new ApiService();
  const postResultList: PostResult<PostData[]> = await apiService.fetchPosts();
  return postResultList.data;
}

export default async function HomePage() {
  const postList = await getPosts();

  return (
    <div className="p-4 min-h-screen flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-white p-4">전체 인기글</h1>
        <main className="flex flex-col p-4 space-y-4">
          {postList?.map((post) => (
            <Link key={post.id} href={`post/${post.id}`} passHref>
              <div className="bg-gray-800 p-2 rounded shadow transition transform hover:bg-gray-700 hover:scale-105 flex space-x-4">
                <Image
                  src={thumnail}
                  alt={post.title}
                  width="64"
                  height="64"
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex flex-col justify-between">
                  <h2 className="text-white font-bold">{post.title}</h2>
                  <div className="flex items-center text-gray-400">
                    <div className="mx-2 flex items-center space-x-1">
                      {post.User?.name}
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      <FaEye />
                      <span>{post.viewCount}</span>
                    </div>
                    <div className="mx-2 flex items-center space-x-1">
                      <FaThumbsUp />
                      <span>{post.recommendCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
