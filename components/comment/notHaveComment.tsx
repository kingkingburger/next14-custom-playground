export const NotHaveComment = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h3 className="text-xl font-semibold mb-4">아직 댓글이 없어요!</h3>
      <p className="text-gray-600">
        가장 먼저 댓글을 남겨보세요. 당신의 생각을 공유해 주세요!
      </p>
      <div className="mt-6 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.56 0 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75 3.75 7.44 3.75 12 7.44 20.25 12 20.25z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-3-3v6"
          />
        </svg>
      </div>
    </div>
  );
};
