import ApiService from "@/lib/fetch";

interface PostIdPageProps {
  params: {
    id: string;
  };
}

export default async function PostIdPageClient({ params }: PostIdPageProps) {
  const apiService = new ApiService();
  const postResult = await apiService.getPostById(params.id);
  const post = postResult.data;

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <h1 className="text-4xl font-bold mb-4 text-white">{post?.title}</h1>
        <div className="flex justify-between items-center mb-4 text-gray-400">
          <span>ID: {post?.id}</span>
          <span>{post?.createdDate}</span>
        </div>
        <div className="text-lg text-gray-300">{post?.content}</div>
      </main>
      {/*<CommentPage />*/}
    </div>
  );
}
