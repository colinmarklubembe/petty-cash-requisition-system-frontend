import * as yup from "yup";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { companyApi } from "../../api";

export const companySchema = yup.object().shape({
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

export interface CompanyFormInputs {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  phone: string;
  companyEmail: string;
}

interface CreateCompanyProps {
  onClose: () => void;
  onCreate: (newCompany: CompanyFormInputs) => void;
}

const CreateCompany: React.FC<CreateCompanyProps> = ({ onClose, onCreate }) => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormInputs>({
    resolver: yupResolver(companySchema),
  });

  const onSubmit: SubmitHandler<CompanyFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await companyApi.createCompany(data);
      setToastMessage(response.message);
      console.log("Company Created Successfully! ", response);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create Company! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Create Company
      </h2>
      {toastMessage && (
        <div className="mb-6 p-3 rounded bg-blue-100 text-blue-700">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Company Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3">
                <FontAwesomeIcon icon={faBuilding} className="text-blue-900" />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter company name"
                {...register("name")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Street
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-900"
                />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter street"
                {...register("address.street")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.address?.street?.message}
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              City
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-900"
                />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter city"
                {...register("address.city")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.address?.city?.message}
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              State
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-900"
                />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter state"
                {...register("address.state")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.address?.state?.message}
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Country
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-blue-900"
                />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter country"
                {...register("address.country")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.address?.country?.message}
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Phone
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3">
                <FontAwesomeIcon icon={faPhone} className="text-blue-900" />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter phone number"
                {...register("phone")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.phone?.message}</p>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium">
              Company Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="px-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-900" />
              </span>
              <input
                className="w-full p-3 focus:outline-none"
                placeholder="Enter company email"
                {...register("companyEmail")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">
              {errors.companyEmail?.message}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-300"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
