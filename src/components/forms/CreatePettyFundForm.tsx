import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { pettyCashApi } from "../../api";
import { fundSchema } from "../../validators";

export interface PettyFundFormInputs {
  name: string;
  amount: number;
}

interface CreatePettyFundFormProps {
  onClose: () => void;
  onCreate: (newPettyFund: PettyFundFormInputs) => void;
}

const CreatePettyFundForm: React.FC<CreatePettyFundFormProps> = ({
  onClose,
  onCreate,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PettyFundFormInputs>({
    resolver: yupResolver(fundSchema),
  });

  const onSubmit: SubmitHandler<PettyFundFormInputs> = async (data) => {
    setSubmitting(true);

    try {
      const response = await pettyCashApi.createPettyCashFund(data);
      toast.success(response.message);
      onCreate(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create petty fund! Please try again.";
      toast.error(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Create Petty Fund
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {submitting ? "Creating..." : "Create Petty Fund"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePettyFundForm;
