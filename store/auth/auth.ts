import { AuthActions, AuthState, SignInForm } from "@/store/auth/type";
import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { ApiResponseResult, tokenType } from "@/lib/response.type";

const initial: AuthState = {
  isAuthenticated: false,
  user: null,
  id: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initial,

  signUp: async (form) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user`, form, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
    } finally {
    }
  },
  signIn: async (form) => {
    try {
      const response = await axios.post<
        SignInForm,
        AxiosResponse<ApiResponseResult<tokenType>>
      >(`${process.env.NEXT_PUBLIC_SERVER}/auth/token`, form, {});

      if (response.data) {
        const result = response.data;
        localStorage.setItem("access-token", result.data.accessToken);
        set({ isAuthenticated: true, user: result.data.user });
      } else {
        toast(`로그인 실패`, {
          description: "로그인이 되지 않았습니다 입력정보를 다시 확인해주세요",
          action: {
            label: "확인",
            onClick: () => console.log("Undo"),
          },
        });
      }
    } catch (e) {
    } finally {
    }
  },

  signOut: () => {
    set({ isAuthenticated: false, user: null, id: null });
  },
  setId: (id: string | number) => {
    set({ id });
  },
}));
