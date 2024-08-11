import { PettyFund } from "./PettyFund";

export interface AdminDashboardData {
  totalUsers: number;
  companyFunds: PettyFund[];
  totalFunds: number;
  monthlyTransactions: number;
  monthlyRequisitions: number;
  totalActiveFunds: number;
  activeFunds: PettyFund[];
  spendingByFund: { fund: string; totalSpent: number }[];
}

export interface UserDashboardData {
  userMonthlyTransactions: number;
  userMonthlyRequisitions: number;
  totalActiveFunds: number;
  activeFunds: PettyFund[];
  userSpendingByFund: { fund: string; totalSpent: number }[];
}
