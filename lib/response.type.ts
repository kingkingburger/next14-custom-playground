import { UserData } from "@/store/user/userType";

export interface ApiResponseResult<T> {
  statusCode: number;
  timestamp: Date;
  data: T;
}

export interface tokenType {
  accessToken: string;
  user: UserData;
}
