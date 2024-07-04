import { create } from "zustand";
import { UserData } from "@/store/user/userType";
import axios from "axios";

const initial: UserData = {
  id: 0,
  email: "",
  password: "",
  name: "",
  profilePicture: "",
  createdAt: "",
  updatedAt: "",
};
export const useUserStore = create<UserData>((set) => ({
  ...initial,

  getUser: async (token: string) => {
    try {
      const token = localStorage.getItem("access-token");
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/profile`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      if (result.data) {
        set({ id: result.data.id });
      }
    } catch (e) {
    } finally {
    }
  },
}));
