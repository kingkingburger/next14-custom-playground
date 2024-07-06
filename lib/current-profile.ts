import { jwtDecode } from "jwt-decode";

export const getProfile = () => {
  const token = localStorage.getItem("access-token");
  if (token) {
    return jwtDecode(token);
  }
};
