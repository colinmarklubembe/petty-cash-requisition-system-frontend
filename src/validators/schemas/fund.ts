import * as yup from "yup";

const pettyFundSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
});

export default pettyFundSchema;
