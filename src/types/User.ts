import { Company } from "./Company";

export interface User {
  id: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  email: string;
  phoneNumber?: string | undefined;
  userCompanies: Company[] | undefined;
}

export interface UserCompany {
  userId: string | undefined;
  companyId: string | undefined;
  role: string;
  user: User;
}
