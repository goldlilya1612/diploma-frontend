import { EUserRole } from "../../enums/user-role.enum";
import { IGroupRegister } from "./group-register.interface";

export interface IDataRegister {
  name: string;
  surname: string;
  fathername: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: EUserRole;
  groups: Array<IGroupRegister> | null;
}
