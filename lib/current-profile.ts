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

export const getCurrentUserInfo = (
  setUserInfo: (
    value: ((prevState: payload | null) => payload | null) | payload | null,
  ) => void,
  isAuthenticated: boolean,
) => {
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
};
