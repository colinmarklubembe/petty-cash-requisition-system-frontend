import * as yup from "yup";

const transactionSchema = yup.object().shape({
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  requisitionId: yup.string().required("Requisition is required"),
  type: yup
    .string()
    .oneOf(["DEBIT", "CREDIT"], "Invalid type")
    .required("Type is required"),
});

export default transactionSchema;
