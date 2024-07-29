import { PettyFund } from "./PettyFund";

export interface Requisition {
  id: string;
  title: string;
  description: string;
  amount: number;
  requisitionStatus: string;
  pettyCashFundId: string;
  pettyCashFund: PettyFund | null;
}

export interface RequisitionFormInputs {
  title: string;
  description: string;
  amount: number;
  pettyCashFundId: string;
}
