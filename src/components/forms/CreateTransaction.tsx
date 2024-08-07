import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { transactionApi, requisitionApi } from "../../api";
import { transactionSchema } from "../../validators";

export interface TransactionFormInputs {
  amount: number;
  requisitionId: string;
  type: "DEBIT" | "CREDIT";
}

interface CreateTransactionProps {
  onClose: () => void;
  onCreate: (newTransaction: TransactionFormInputs) => void;
}

const CreateTransaction: React.FC<CreateTransactionProps> = ({
  onClose,
  onCreate,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [requisitions, setRequisitions] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormInputs>({
    resolver: yupResolver(transactionSchema),
  });

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await requisitionApi.getAllRequisitions();
        setRequisitions(response.data.requisitions);
      } catch (error) {
        console.error("Failed to fetch requisitions: ", error);
      }
    };

    fetchRequisitions();
  }, []);

  const onSubmit: SubmitHandler<TransactionFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await transactionApi.createTransaction(data);
      setToastMessage(response.message);
      onCreate(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create transaction! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Create Transaction
      </h2>
      {toastMessage && (
        <div className="mb-4 p-3 rounded bg-[#FEE5E0] text-[#F05A28]">
          {toastMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Requisition
          </label>
          <div className="relative mt-1">
            <select
              className="block w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              {...register("requisitionId")}
            >
              <option value="" className="text-gray-500">
                -- Select Requisition --
              </option>
              {requisitions.map((req) => (
                <option key={req.id} value={req.id} className="text-gray-700">
                  {req.title}
                </option>
              ))}
            </select>
          </div>
          <p className="text-red-600 text-sm mt-1">
            {errors.requisitionId?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-[#202046] text-sm font-medium">
            Type
          </label>
          <div className="relative mt-1">
            <select
              className="block w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              {...register("type")}
            >
              <option value="" className="text-gray-500">
                -- Select Type --
              </option>
              <option value="DEBIT" className="text-gray-700">
                Debit
              </option>
              <option value="CREDIT" className="text-gray-700">
                Credit
              </option>
            </select>
          </div>
          <p className="text-red-600 text-sm mt-1">{errors.type?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#202046] text-white py-2 rounded-lg hover:bg-[#161631] transition-colors"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Transaction"}
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
