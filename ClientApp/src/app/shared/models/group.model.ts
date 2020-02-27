import { GroupUser } from "./group-user.model";

export interface Group {
  name: string;
  members: GroupUser[]
}
