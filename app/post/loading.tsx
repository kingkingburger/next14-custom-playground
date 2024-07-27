import { Skeleton } from "@/components/ui/skeleton";

const PostLoading = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-full mb-4"></div>
        </div>
      </main>
    </div>
  );
};

export default PostLoading;
