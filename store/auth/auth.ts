import { AuthActions, AuthState, SignInForm } from "@/store/auth/type";
import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { ApiResponseResult, tokenType } from "@/lib/response.type";
import { UserData } from "@/store/user/userType";

const initial: AuthState = {
  isAuthenticated: false,
  user: null,
  id: null,
};

const apiCall = async <T>(url: string, data: any) => {
  return axios.post<SignInForm, AxiosResponse<ApiResponseResult<T>>>(
    url,
    data,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initial,

  signUp: async (form) => {
    try {
      const signUpResponse = await apiCall<UserData>(
        `${process.env.NEXT_PUBLIC_SERVER}/user/create`,
        form,
      );

      if (signUpResponse.data.statusCode === 201) {
        const loginResponse = await apiCall<tokenType>(
          `${process.env.NEXT_PUBLIC_SERVER}/auth/token`,
          form,
        );
        const result = loginResponse.data;

        if (result.statusCode === 200) {
          localStorage.setItem("access-token", result.data.accessToken);
          set({ isAuthenticated: true, user: result.data.user });
        }
      }
    } catch (error: any) {
      toast(`회원가입 실패`, {
        description: `${error?.response?.data?.message}`,
        action: {
          label: "확인",
          onClick: () => console.log("Undo"),
        },
      });
    }
  },

  signIn: async (form) => {
    try {
      const response = await apiCall<tokenType>(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/token`,
        form,
      );

      const result = response.data;
      if (result.statusCode === 200) {
        localStorage.setItem("access-token", result.data.accessToken);
        set({ isAuthenticated: true, user: result.data.user });
      }
    } catch (error) {
      toast(`로그인 실패`, {
        description: "로그인이 되지 않았습니다 입력정보를 다시 확인해주세요",
        action: {
          label: "확인",
          onClick: () => console.log("Undo"),
        },
      });
    }
  },

  signOut: () => {
    localStorage.removeItem("access-token");
    set({ isAuthenticated: false, user: null, id: null });
  },

  setId: (id: string | number) => {
    set({ id });
  },
}));
