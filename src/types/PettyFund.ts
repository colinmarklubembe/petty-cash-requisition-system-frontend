import { Requisition } from "./Requisition";

export interface PettyFund {
  id: string;
  name: string;
  currentBalance: number;
  totalSpent: number | null;
  totalAdded: number | null;
  requisitions: Requisition[] | null;
}

export interface PettyFundFormInputs {
  name: string;
  amount: number;
}
