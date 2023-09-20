import { User } from "~/interfaces/users";

export interface APILoginResponse {
  data: UserTokenData;
}

export interface UserTokenData {
  user:         User;
  access_token: string;
}

export interface LoginInput {
  email:    string;
  password: string;
  remember?: boolean;
}

