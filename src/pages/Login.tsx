import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/image/herobackground1.jpg";
import { loginSchema } from "../validators";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await authApi.login(data);
      setToastMessage(response.message);

      const expirationTime = new Date().getTime() + 3600 * 1000 * 48;
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      localStorage.setItem("expirationTime", expirationTime.toString());

      // Navigate after a slight delay to ensure everything is set
      setTimeout(() => {
        navigate("/companies");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-md w-full p-6 bg-white bg-opacity-90 rounded-lg shadow-xl transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Login
        </h2>
        {toastMessage && (
          <div className="mb-6 p-3 rounded bg-blue-100 text-blue-700 border border-blue-300 transition-opacity opacity-90 hover:opacity-100">
            {toastMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow duration-300">
              <span className="px-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-900" />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow duration-300 relative">
              <span className="px-3">
                <FontAwesomeIcon icon={faLock} className="text-blue-900" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 focus:outline-none pr-10"
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-blue-900 text-sm"
                />
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-blue-700 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#202046] text-white py-3 rounded-full hover:bg-blue-800 transition-colors text-lg font-semibold flex items-center justify-center"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#202046] font-semibold hover:underline hover:text-[#F05A28] transition-colors duration-200 ease-in-out"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
