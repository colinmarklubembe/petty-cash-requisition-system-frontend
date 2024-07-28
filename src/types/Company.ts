// src/types/Company.ts
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface Company {
  id: string;
  name: string;
  description: string | null;
  address: Address;
  phoneNumber: string;
  companyEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  data: {
    companies: {
      id: string;
      userId: string;
      companyId: string;
      role: string;
      company: Company;
    }[];
  };
}
