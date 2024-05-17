import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";

export default function MainHeader() {
  return (
    <div className="fixed top-4 right-4 flex space-x-4">
      <Link
        href="/new-post"
        className="bg-teal-500 text-white px-4 py-2 rounded transition transform hover:bg-teal-400 hover:scale-105 hover:shadow-lg"
      >
        글작성
      </Link>

      <Link
        href="/"
        className="bg-blue-500 text-white px-4 py-2 rounded transition transform hover:bg-blue-400 hover:scale-105 hover:shadow-lg"
      >
        홈
      </Link>

      <ModeToggle />
    </div>
  );
}
