import { create } from "zustand";
import { UserAction, UserData } from "@/store/user/userType";
import { payload } from "@/store/auth/type";
import { getProfile, isTokenExpired } from "@/lib/current-profile";
import ky from "@toss/ky";
import { API_BASE_URL } from "@/lib/constant";
import { ApiResponseResult } from "@/lib/response.type";

export const useUserStore = create<UserData & UserAction>((set) => ({
  id: 0,
  email: "",
  password: "",
  name: "",
  profilePicture: "",
  createdAt: "",
  updatedAt: "",

  getUser: async () => {
    try {
      const token = localStorage?.getItem("access-token");

      if (token && !isTokenExpired(token)) {
        const profile = getProfile() as payload;
        const userInfo = await ky
          .get(`${API_BASE_URL}/user/id/${profile.userId}`)
          .json<ApiResponseResult<UserData>>();
        set(userInfo.data);
      }
    } catch (e) {
    } finally {
    }
  },
}));
