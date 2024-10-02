import { jwtDecode } from "jwt-decode";
import { payload } from "@/store/auth/type";
import { useEffect } from "react";

export const getProfile = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage?.getItem("access-token");
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

// 토큰이 만료되었는지 확인하는 함수
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token) as { exp: number };
    const currentTime = Date.now() / 1000; // 초 단위로 현재 시간 계산
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // 토큰이 잘못되었을 경우 만료된 것으로 간주
  }
};

// 사용자 정보 가져오기 및 토큰 유효성 체크
export const useCurrentUserInfo = (
  setUserInfo: (
    value: ((prevState: payload | null) => payload | null) | payload | null,
  ) => void,
  isAuthenticated: boolean,
) => {
  useEffect(() => {
    const checkUserInfo = () => {
      try {
        const token = localStorage?.getItem("access-token");

        if (token && !isTokenExpired(token)) {
          const profile = getProfile() as payload;
          setUserInfo((prevState) =>
            prevState?.userId === profile?.userId ? prevState : profile,
          );
        } else {
          setUserInfo(null); // 토큰이 없거나 만료된 경우 null 처리
        }
      } catch (error) {
        console.error("Failed to get user profile:", error);
        setUserInfo(null);
      }
    };

    checkUserInfo();
  }, [isAuthenticated]);
};
