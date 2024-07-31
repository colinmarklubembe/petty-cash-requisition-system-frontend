import { Company } from "./Company";

export interface User {
  id: string;
  firtstName: string;
  middleName: string;
  lastName: string;
  email: string;
  userCompanies: Company[];
}
