import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signup } from "../api/authApi";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await signup(data);
      setToastMessage(response.message);
      console.log("Signup successful", response);
    } catch (error: any) {
      setToastMessage(error.response.data.error);
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-center">Signup</h2>
      {toastMessage && (
        <div className="mb-4 p-3 rounded bg-gray-200 text-gray-700">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register("firstName")}
          />
          <p className="text-red-600 text-sm">{errors.firstName?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register("lastName")}
          />
          <p className="text-red-600 text-sm">{errors.lastName?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register("email")}
          />
          <p className="text-red-600 text-sm">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register("password")}
          />
          <p className="text-red-600 text-sm">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
