import ApiService from "@/lib/fetch";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FaEye } from "react-icons/fa";
import CommentInputComponent from "@/components/comment/commentInput";
import CommentListComponent from "@/components/comment/commentLIst";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface PostIdPageProps {
  params: {
    id: string;
  };
}

const window = new JSDOM("").window;
const DOMPurifyInstance = DOMPurify(window);

export default async function PostIdPageClient({ params }: PostIdPageProps) {
  const apiService = new ApiService();
  const postResult = await apiService.getPostById(params.id);
  const post = postResult.data;

  const sanitizedContent = DOMPurifyInstance.sanitize(post?.content);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <main className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 border border-gray-700">
        <h1 className="text-4xl font-bold mb-4 text-white">{post?.title}</h1>
        <button>
          <AiFillLike />
          <AiOutlineLike />
          좋아요
        </button>
        <div className="flex justify-between items-center mb-4 text-gray-400">
          <span>ID: {post?.User.name}</span>

          <div className="text-right">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <FaEye />
                <span>{post.viewCount}</span>
              </div>
              <span>
                {formatDistanceToNow(new Date(post?.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {dayjs(post?.createdAt).format("YYYY-MM-DD HH:mm")}
            </div>
          </div>
        </div>

        <div
          className="text-lg text-gray-300"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </main>
      <CommentListComponent params={{ id: post.id }} />
      <CommentInputComponent params={{ id: post.id }} />
    </div>
  );
}
