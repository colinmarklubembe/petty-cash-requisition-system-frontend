import * as yup from "yup";

const companySchema = yup.object().shape({
  name: yup.string().required("Company name is required"),
  address: yup.object().shape({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
  }),
  phone: yup.string().required("Phone number is required"),
  companyEmail: yup
    .string()
    .email("Invalid email")
    .required("Company email is required"),
});

export default companySchema;
