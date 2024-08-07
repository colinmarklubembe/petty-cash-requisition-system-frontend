import React, { useState, useEffect } from "react";
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
import { companySchema } from "../../validators";

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

interface EditCompanyProps {
  onClose: () => void;
  onEdit: (updatedCompany: CompanyFormInputs) => void;
  initialData: CompanyFormInputs;
  companyId: string;
}

const EditCompany: React.FC<EditCompanyProps> = ({
  onClose,
  onEdit,
  initialData,
  companyId,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormInputs>({
    resolver: yupResolver(companySchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<CompanyFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await companyApi.editCompany(companyId, data);
      setToastMessage(response.message);
      console.log("Company Updated Successfully! ", response);
      onEdit(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to update Company! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Edit Company
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
              Company Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1">
              <span className="px-3">
                <FontAwesomeIcon icon={faBuilding} className="text-[#F05A28]" />
              </span>
              <input
                className="w-full p-2 focus:outline-none"
                placeholder="Enter company name"
                {...register("name")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label className="block text-[#202046] text-sm font-medium">
                Street
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg mt-1">
                <span className="px-3">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-[#F05A28]"
                  />
                </span>
                <input
                  className="w-full p-2 focus:outline-none"
                  placeholder="Enter street"
                  {...register("address.street")}
                />
              </div>
              <p className="text-red-600 text-sm mt-1">
                {errors.address?.street?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-[#202046] text-sm font-medium">
                City
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg mt-1">
                <span className="px-3">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-[#F05A28]"
                  />
                </span>
                <input
                  className="w-full p-2 focus:outline-none"
                  placeholder="Enter city"
                  {...register("address.city")}
                />
              </div>
              <p className="text-red-600 text-sm mt-1">
                {errors.address?.city?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-[#202046] text-sm font-medium">
                State
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg mt-1">
                <span className="px-3">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-[#F05A28]"
                  />
                </span>
                <input
                  className="w-full p-2 focus:outline-none"
                  placeholder="Enter state"
                  {...register("address.state")}
                />
              </div>
              <p className="text-red-600 text-sm mt-1">
                {errors.address?.state?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-[#202046] text-sm font-medium">
                Country
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg mt-1">
                <span className="px-3">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-[#F05A28]"
                  />
                </span>
                <input
                  className="w-full p-2 focus:outline-none"
                  placeholder="Enter country"
                  {...register("address.country")}
                />
              </div>
              <p className="text-red-600 text-sm mt-1">
                {errors.address?.country?.message}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[#202046] text-sm font-medium">
              Phone
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1">
              <span className="px-3">
                <FontAwesomeIcon icon={faPhone} className="text-[#F05A28]" />
              </span>
              <input
                className="w-full p-2 focus:outline-none"
                placeholder="Enter phone number"
                {...register("phone")}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.phone?.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-[#202046] text-sm font-medium">
              Company Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-1">
              <span className="px-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#F05A28]" />
              </span>
              <input
                className="w-full p-2 focus:outline-none"
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
          className="w-full bg-[#202046] text-white py-2 rounded-lg hover:bg-[#161631] transition-colors"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Company"}
        </button>
      </form>
    </div>
  );
};

export default EditCompany;
