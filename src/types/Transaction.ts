import { PettyFund } from "./PettyFund";
import { Requisition } from "./Requisition";

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  requisitionId: string;
  requisition: Requisition | undefined;
  pettyCashFund: PettyFund | undefined;
}

export interface TransactionFormInputs {
  amount: number;
  type: string;
  requisitionId: string;
}
