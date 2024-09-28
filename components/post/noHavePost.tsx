export const NotHavePost = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          게시글을 찾을 수 없습니다
        </h1>
        <p className="text-gray-400 mb-6">
          요청하신 게시글이 존재하지 않거나 삭제되었습니다.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
};
