import { UserData } from "@/store/user/userType";

export interface ApiResponseResult<T> {
  statusCode: number;
  timestamp: Date;
  data: T;
  path?: string;
  method?: string;
  customMessage?: string;
}

export interface tokenType {
  accessToken: string;
  user: UserData;
}
