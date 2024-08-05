import { Requisition } from "./Requisition";
import { Transaction } from "./Transaction";
import { User } from "./User";

export interface UserMonthlyRequisitions {
  currentMonthRequisitions: {
    month: number;
    year: number;
    requisitions: Requisition[];
  };
  totalMonthlyRequisitions: number;
}

export interface UserMonthlyTransactions {
  currentMonthTransactions: {
    month: number;
    year: number;
    transactions: Transaction[];
  };
  totalMonthlyRequisitions: number;
}

export interface ReportData {
  userMonthlyRequisitions: UserMonthlyRequisitions;
  userMonthlyTransactions: UserMonthlyTransactions;
}

export interface Report {
  user: User;
  report: ReportData;
}
