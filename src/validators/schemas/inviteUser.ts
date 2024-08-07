import * as yup from "yup";

const inviteUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().optional(),
  lastName: yup.string().required("Last name is required"),
  role: yup.string().required("Role is required"),
});

export default inviteUserSchema;
