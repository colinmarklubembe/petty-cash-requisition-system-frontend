import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faMoneyBillWave,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { requisitionApi, pettyCashApi } from "../../api";
import { requisitionSchema } from "../../validators";

export interface RequisitionFormInputs {
  title: string;
  description: string;
  amount: number;
  pettyCashFundId: string;
}

interface CreateRequisitionProps {
  onClose: () => void;
  onCreate: (newRequisition: RequisitionFormInputs) => void;
}

const CreateRequisition: React.FC<CreateRequisitionProps> = ({
  onClose,
  onCreate,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pettyCashFunds, setPettyCashFunds] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequisitionFormInputs>({
    resolver: yupResolver(requisitionSchema),
  });

  useEffect(() => {
    const fetchPettyCashFunds = async () => {
      try {
        const response = await pettyCashApi.getPettyCashFunds();
        setPettyCashFunds(response.data.pettyCashFunds);
      } catch (error) {
        console.error("Failed to fetch petty cash funds: ", error);
      }
    };

    fetchPettyCashFunds();
  }, []);

  const onSubmit: SubmitHandler<RequisitionFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await requisitionApi.createRequisition(data);
      setToastMessage(response.message);
      console.log("Requisition Created Successfully! ", response);
      onCreate(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create requisition! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Create Requisition
      </h2>
      {toastMessage && (
        <div className="mb-4 p-3 rounded bg-[#FEE5E0] text-[#F05A28]">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="mb-4">
          <label className="block text-[#202046] text-sm font-medium">
            Petty Cash Fund
          </label>
          <div className="relative mt-1">
            <select
              className="block w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              {...register("pettyCashFundId")}
            >
              <option value="" className="text-gray-500">
                -- Select Cash Fund --
              </option>
              {pettyCashFunds.map((fund) => (
                <option key={fund.id} value={fund.id} className="text-gray-700">
                  {fund.name}
                </option>
              ))}
            </select>
          </div>

          <p className="text-red-600 text-sm mt-1">
            {errors.pettyCashFundId?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#202046] text-white py-2 rounded-lg hover:bg-[#161631] transition-colors"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Requisition"}
        </button>
      </form>
    </div>
  );
};

export default CreateRequisition;
