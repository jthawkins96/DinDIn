import { User } from "./user.model";

export interface AuthToken {
  token: string;
  user: User;
}
