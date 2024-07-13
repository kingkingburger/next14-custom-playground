"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { getProfile } from "@/lib/current-profile";
import { useEffect, useState } from "react";
import { payload } from "@/store/auth/type";
import { useAuthStore } from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MainHeader() {
  const [userInfo, setUserInfo] = useState<payload | null>(null);
  const { signOut, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkUserInfo = () => {
      try {
        const profile = getProfile() as payload;
        setUserInfo((prevState) =>
          prevState?.userId === profile?.userId ? prevState : profile,
        );
      } catch (error) {
        console.error("Failed to get user profile:", error);
        setUserInfo(null);
      }
    };

    checkUserInfo();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    signOut();
    setUserInfo(null);
    router.push("/"); // 로그아웃 후 홈페이지로 리다이렉트
  };

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
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="p-2 rounded bg-gray-700 text-white"
          />

          {userInfo ? (
            <Link
              href="/new-post"
              className="bg-teal-500 text-white px-4 py-2 rounded transition transform hover:bg-teal-400 hover:scale-105 hover:shadow-lg"
            >
              글작성
            </Link>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled
                    className="bg-teal-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
                  >
                    글작성
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>로그인이 필요합니다</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {userInfo ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded transition transform hover:bg-red-400 hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">{userInfo.username}</span>
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded transition transform hover:bg-blue-400 hover:scale-105 hover:shadow-lg"
            >
              로그인
            </Link>
          )}
          <ModeToggle />
        </div>
      </header>
    </div>
  );
}
