import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { pettyCashApi } from "../../api";
import { PettyFundFormInputs } from "../../types/PettyFund";
import { PettyFund } from "../../types/PettyFund";

export const pettyFundSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
});

interface EditPettyFundFormProps {
  onClose: () => void;
  onSubmit: (updatedPettyFund: PettyFundFormInputs) => void;
  initialData: PettyFund;
}

const EditPettyFundForm: React.FC<EditPettyFundFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PettyFundFormInputs>({
    resolver: yupResolver(pettyFundSchema),
    defaultValues: {
      name: initialData.name,
      amount: initialData.currentBalance,
    },
  });

  useEffect(() => {
    reset({
      name: initialData.name,
      amount: initialData.currentBalance,
    });
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<PettyFundFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await pettyCashApi.updatePettyCashFund(
        initialData.id,
        data
      );
      setToastMessage(response.message);
      console.log("Petty Fund Updated Successfully! ", response);
      onSubmit(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to update petty fund! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Edit Petty Fund
      </h2>
      {toastMessage && (
        <div className="mb-4 p-3 rounded bg-[#FEE5E0] text-[#F05A28]">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <label className="block text-[#202046] text-sm font-medium">
            Name
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg mt-1">
            <span className="px-3">
              <FontAwesomeIcon icon={faFileAlt} className="text-[#F05A28]" />
            </span>
            <input
              className="w-full p-2 focus:outline-none"
              placeholder="Enter name"
              {...register("name")}
            />
          </div>
          <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-[#202046] text-sm font-medium">
            Amount
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg mt-1">
            <span className="px-3">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="text-[#F05A28]"
              />
            </span>
            <input
              className="w-full p-2 focus:outline-none"
              placeholder="Enter amount"
              type="number"
              {...register("amount")}
            />
          </div>
          <p className="text-red-600 text-sm mt-1">{errors.amount?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#202046] text-white py-2 rounded-lg hover:bg-[#161631] transition-colors"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Petty Fund"}
        </button>
      </form>
    </div>
  );
};

export default EditPettyFundForm;
