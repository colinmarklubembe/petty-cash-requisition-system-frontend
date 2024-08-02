import { Company } from "./Company";

export interface User {
  id: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  email: string;
  userCompanies: Company[] | undefined;
}

export interface UserCompany {
  userId: string;
  companyId: string;
  role: string;
  user: User;
}
