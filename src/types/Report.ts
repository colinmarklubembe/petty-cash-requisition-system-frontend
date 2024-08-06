import { Company } from "./Company";
import { Requisition } from "./Requisition";
import { Transaction } from "./Transaction";
import { User } from "./User";

export interface CompanyMonthlyRequisitions {
  currentMonthRequisitions: {
    month: number;
    year: number;
    requisitions: Requisition[];
  };
  totalMonthlyRequisitions: number;
}
export interface UserMonthlyRequisitions {
  currentMonthRequisitions: {
    month: number;
    year: number;
    requisitions: Requisition[];
  };
  totalMonthlyRequisitions: number;
}

export interface CompanyMonthlyTransactions {
  currentMonthTransactions: {
    month: number;
    year: number;
    transactions: Transaction[];
  };
  totalMonthlyTransactions: number;
}

export interface UserMonthlyTransactions {
  currentMonthTransactions: {
    month: number;
    year: number;
    transactions: Transaction[];
  };
  totalMonthlyTransactions: number;
}

export interface CompanyReportData {
  companyMonthlyRequisitions: CompanyMonthlyRequisitions;
  companyMonthlyTransactions: CompanyMonthlyTransactions;
}

export interface UserReportData {
  userMonthlyRequisitions: UserMonthlyRequisitions;
  userMonthlyTransactions: UserMonthlyTransactions;
}

export interface CompanyReport {
  company: Company;
  report: CompanyReportData;
}

export interface UserReport {
  user: User;
  report: UserReportData;
}
