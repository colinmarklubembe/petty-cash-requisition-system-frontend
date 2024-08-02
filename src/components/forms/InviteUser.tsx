import * as yup from "yup";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { userApi } from "../../api";

export const inviteUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  role: yup.string().required("Role is required"),
});

export interface InviteUserFormInputs {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface InviteUserProps {
  onClose: () => void;
  onCreate: (newUser: InviteUserFormInputs) => void;
}

const InviteUser: React.FC<InviteUserProps> = ({ onClose, onCreate }) => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteUserFormInputs>({
    resolver: yupResolver(inviteUserSchema),
  });

  const onSubmit: SubmitHandler<InviteUserFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await userApi.inviteUser(data);
      setToastMessage("User invited successfully!");
      console.log("User Invited Successfully! ", response);
      onCreate(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to invite user! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Invite User
      </h2>
      {toastMessage && (
        <div className="mb-4 p-3 rounded bg-[#FEE5E0] text-[#F05A28]">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <label className="block text-[#202046] text-sm font-medium">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1">
              <span className="px-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#F05A28]" />
              </span>
              <input
                className="w-full p-2 focus:outline-none"
                placeholder="Enter email"
                {...register("email")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-[#202046] text-sm font-medium">
              First Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1">
              <span className="px-3">
                <FontAwesomeIcon icon={faUser} className="text-[#F05A28]" />
              </span>
              <input
                className="w-full p-2 focus:outline-none"
                placeholder="Enter first name"
                {...register("firstName")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.firstName?.message}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-[#202046] text-sm font-medium">
              Last Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1">
              <span className="px-3">
                <FontAwesomeIcon icon={faUser} className="text-[#F05A28]" />
              </span>
              <input
                className="w-full p-2 focus:outline-none"
                placeholder="Enter last name"
                {...register("lastName")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.lastName?.message}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-[#202046] text-sm font-medium">
              Role
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("role")}
            >
              <option value="">Select role</option>
              <option value="ADMIN">Admin</option>
              <option value="FINANCE">Finance</option>
              <option value="Employee">Employee</option>
            </select>
            <p className="text-red-600 text-sm mt-1">{errors.role?.message}</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#202046] text-white py-2 rounded-lg hover:bg-[#161631] transition-colors"
          disabled={submitting}
        >
          {submitting ? "Inviting..." : "Invite User"}
        </button>
      </form>
    </div>
  );
};

export default InviteUser;
