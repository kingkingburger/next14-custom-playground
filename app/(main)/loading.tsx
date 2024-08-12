const HomeLoading = () => {
  return (
    <div className="p-4 min-h-screen flex justify-center bg-gray-900">
      <div className="w-full max-w-3xl">
        <h1 className="text-white p-4">전체 인기글</h1>
        <main className="flex flex-col p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 p-2 rounded shadow flex space-x-4 animate-pulse"
            >
              <div className="bg-gray-700 w-16 h-16 rounded"></div>
              <div className="flex flex-col justify-between space-y-2">
                <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-700 h-4 w-1/4 rounded"></div>
                  <div className="bg-gray-700 h-4 w-1/4 rounded"></div>
                  <div className="bg-gray-700 h-4 w-1/4 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default HomeLoading;
