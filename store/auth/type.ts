import { UserData } from "@/store/user/userType";

export interface SignUpForm {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface SignInForm {
  email?: string;
  password?: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  user?: UserData | null;
  id?: string | number | null;
};

export type AuthActions = {
  signUp: (form: SignUpForm) => Promise<void>;
  signIn: (form: SignInForm) => Promise<void>;
  signOut: () => void;
  setId: (id: string | number) => void;
};

export interface payload {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}
