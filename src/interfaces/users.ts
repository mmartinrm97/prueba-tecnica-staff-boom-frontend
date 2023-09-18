import { Links, Meta } from "~/interfaces/shared";

export interface APIUsersResponse {
  data:  User[];
  links: Links;
  meta:  Meta;
}

export interface APIUserResponse {
  data: User;
}

export interface User {
  id:                string;
  role_id:           string;
  name:              string;
  email:             string;
  email_verified_at: Date;
  created_at:        Date;
  updated_at:        Date;
}

export interface UserFormData{
  name: string;
  email: string;
}
