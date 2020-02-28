import { GroupUser } from "./group-user.model";

export interface Group {
  id?: number,
  name: string;
  members?: GroupUser[]
}
