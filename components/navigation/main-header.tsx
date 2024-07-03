import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";

export default function MainHeader() {
  return (
    <div className="top-0 left-0 w-full z-50 bg-gray-800 p-4">
      <header className="text-white flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">
          <a
            href="/"
            className="bg-teal-500 text-white px-4 py-2 rounded transition transform hover:bg-teal-400 hover:scale-105 hover:shadow-lg"
          >
            MHBoard
          </a>
        </h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="p-2 rounded bg-gray-700 text-white"
          />
          <Link
            href="/new-post"
            className="bg-teal-500 text-white px-4 py-2 rounded transition transform hover:bg-teal-400 hover:scale-105 hover:shadow-lg"
          >
            글작성
          </Link>
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded transition transform hover:bg-blue-400 hover:scale-105 hover:shadow-lg"
          >
            로그인
          </Link>
          {/*<Link*/}
          {/*  href="/"*/}
          {/*  className="bg-blue-500 text-white px-4 py-2 rounded transition transform hover:bg-blue-400 hover:scale-105 hover:shadow-lg"*/}
          {/*>*/}
          {/*  홈*/}
          {/*</Link>*/}
          <ModeToggle />
        </div>
      </header>
    </div>
  );
}
