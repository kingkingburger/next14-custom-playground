import { AuthActions, AuthState, SignInForm } from "@/store/auth/type";
import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import { UserData } from "@/lib/fetch";

const initial: AuthState = {
  isAuthenticated: false,
  user: null,
  id: null,
};

export const userAuthStore = create<AuthState & AuthActions>((set) => ({
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
      const response = await axios.post<SignInForm, AxiosResponse<UserData>>(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/token`,
        form,
        {},
      );
      set({ isAuthenticated: true, user: response.data });
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
