import * as yup from "yup";

const requisitionSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  pettyCashFundId: yup.string().required("Petty cash fund is required"),
});

export default requisitionSchema;
