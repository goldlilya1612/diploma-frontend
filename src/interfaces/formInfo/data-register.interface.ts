import { EUserStatus } from "../../enums/user-statuses.enum";
import { IGroupRegister } from "./group-register.interface";

export interface IDataRegister {
    name: string;
    surname: string;
    fathername: string;
    email: string;
    password: string;
    status: EUserStatus;
    groups: Array<IGroupRegister> | null;
}
