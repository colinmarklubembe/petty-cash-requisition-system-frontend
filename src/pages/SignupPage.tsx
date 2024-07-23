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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Signup
        </h2>
        {toastMessage && (
          <div className="mb-6 p-3 rounded bg-blue-100 text-blue-700">
            {toastMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              First Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("firstName")}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.firstName?.message}
            </p>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Last Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("lastName")}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.lastName?.message}
            </p>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Email
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email")}
            />
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password")}
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-full hover:bg-orange-700 transition-colors text-lg font-semibold"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
