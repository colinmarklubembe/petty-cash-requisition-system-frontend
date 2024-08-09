import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Requisition } from "../../types/Requisition";
import {
  faFileAlt,
  faMoneyBillWave,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { requisitionApi } from "../../api";
import { requisitionSchema } from "../../validators";

export interface RequisitionFormInputs {
  title: string;
  description: string;
  amount: number;
  pettyCashFundId: string;
}

interface EditRequisitionProps {
  onClose: () => void;
  onSubmit: (updatedRequisition: RequisitionFormInputs) => void;
  initialData: Requisition;
}

const EditRequisition: React.FC<EditRequisitionProps> = ({
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
  } = useForm<RequisitionFormInputs>({
    resolver: yupResolver(requisitionSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<RequisitionFormInputs> = async (
    data
  ) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await requisitionApi.updateRequisition(
        initialData.id,
        data
      );
      setToastMessage(response.message);
      onSubmit(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to update requisition! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Edit Requisition
      </h2>
      {toastMessage && (
        <div className="mb-4 p-3 rounded bg-[#FEE5E0] text-[#F05A28]">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <label className="block text-[#202046] text-sm font-medium">
            Title
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg mt-1">
            <span className="px-3">
              <FontAwesomeIcon icon={faFileAlt} className="text-[#F05A28]" />
            </span>
            <input
              className="w-full p-2 focus:outline-none"
              placeholder="Enter title"
              {...register("title")}
            />
          </div>
          <p className="text-red-600 text-sm mt-1">{errors.title?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-[#202046] text-sm font-medium">
            Description
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg mt-1">
            <span className="px-3">
              <FontAwesomeIcon icon={faComment} className="text-[#F05A28]" />
            </span>
            <textarea
              className="w-full p-2 focus:outline-none"
              placeholder="Enter description"
              {...register("description")}
            />
          </div>
          <p className="text-red-600 text-sm mt-1">
            {errors.description?.message}
          </p>
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
          {submitting ? "Updating..." : "Update Requisition"}
        </button>
      </form>
    </div>
  );
};

export default EditRequisition;
