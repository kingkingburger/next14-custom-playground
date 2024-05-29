interface PostIdPage {
  params: {
    id: string;
  };
}

interface PostType {
  message: string;
  code: number;
  data: {
    id: string;
    title: string;
    content: string;
    createdDate: string;
    updatedDate: string;
  };
}

const postIdPage = async ({ params }: PostIdPage) => {
  // const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/post/id/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    },
  );

  const postResult: PostType = (await response?.json()) || {};
  const postContent = postResult.data;

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <h1 className="text-4xl font-bold mb-4 text-white">
          {postContent.title}
        </h1>
        <div className="flex justify-between items-center mb-4 text-gray-400">
          <span>ID: {postContent.id}</span>
          <span>{new Date(postContent.createdDate).toLocaleDateString()}</span>
        </div>
        <div className="text-lg text-gray-300">{postContent.content}</div>
      </main>
    </div>
  );
};

export default postIdPage;
