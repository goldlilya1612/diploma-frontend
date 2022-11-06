export interface IDataRegister {
  name: string;
  surname: string;
  fathername: string;
  email: string;
  password: string;
  status: string;
  groups: Array<string> | null;
}
