import { jwtDecode } from "jwt-decode";

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
