const PostLoading = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700 animate-pulse">
        <div className="flex justify-between items-start mb-6">
          <div className="h-10 w-3/4 bg-gray-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-6 w-20 bg-gray-700 rounded"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-12 bg-gray-700 rounded"></div>
              <div className="h-6 w-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-6 w-full bg-gray-700 rounded"></div>
          <div className="h-6 w-5/6 bg-gray-700 rounded"></div>
          <div className="h-6 w-4/6 bg-gray-700 rounded"></div>
          <div className="h-6 w-full bg-gray-700 rounded"></div>
          <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
        </div>

        <div className="mt-10 space-y-4">
          <div className="h-8 w-1/2 bg-gray-700 rounded"></div>
          <div className="h-40 w-full bg-gray-700 rounded"></div>
        </div>
      </main>
    </div>
  );
};

export default PostLoading;
