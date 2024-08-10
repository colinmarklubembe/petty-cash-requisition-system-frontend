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
