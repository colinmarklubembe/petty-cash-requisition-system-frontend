import React, { useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faComment } from "@fortawesome/free-solid-svg-icons";
import { reportApi } from "../../api";
import { ReportFormInputs } from "../../types/Report";

const reportSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

interface CreateReportProps {
  onClose: () => void;
  onCreate: (newReport: ReportFormInputs) => void;
}

const CreateReport: React.FC<CreateReportProps> = ({ onClose, onCreate }) => {
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormInputs>({
    resolver: yupResolver(reportSchema),
  });

  const onSubmit: SubmitHandler<ReportFormInputs> = async (data) => {
    setSubmitting(true);
    setToastMessage(null);

    try {
      const response = await reportApi.createReport(data);
      setToastMessage("Report created successfully!");
      console.log("Report Created Successfully! ", response);
      onCreate(data);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to create report! Please try again.";
      setToastMessage(errorMessage);
      console.error("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#202046]">
        Create Report
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
            Content
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg mt-1">
            <span className="px-3">
              <FontAwesomeIcon icon={faComment} className="text-[#F05A28]" />
            </span>
            <textarea
              className="w-full p-2 focus:outline-none"
              placeholder="Enter content"
              {...register("content")}
            />
          </div>
          <p className="text-red-600 text-sm mt-1">
            {errors.content?.message?.toString()}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#202046] text-white py-2 rounded-lg hover:bg-[#161631] transition-colors"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Report"}
        </button>
      </form>
    </div>
  );
};

export default CreateReport;
