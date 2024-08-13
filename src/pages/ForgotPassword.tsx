import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { forgotPasswordSchema } from "../validators";
import background from "../assets/image/herobackground1.jpg";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await authApi.forgotPassword(data.email);
      setToastMessage(response.message);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to send reset link. Please try again.";
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
      <div className="max-w-md w-full p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Forgot Password
        </h2>
        {toastMessage && (
          <div className="mb-6 p-3 rounded bg-blue-100 text-blue-700">
            {toastMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
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
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
