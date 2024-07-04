export interface UserData {
  id: number;
  email: string;
  password: string;
  name: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAction {
  getUser: (accessToken: string) => Promise<void>;
}
