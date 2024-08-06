import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { UserReport, CompanyReport } from "../../types/Report";
import { Requisition } from "../../types/Requisition";
import { Transaction } from "../../types/Transaction";

interface DownloadButtonProps {
  reportData?: UserReport | CompanyReport;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  reportData,
  fileName,
}) => {
  const generatePdf = async () => {
    if (!reportData) return;

    const content =
      "user" in reportData
        ? `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff; color: #333;">
        <div style="display: flex; align-items: center; margin-bottom: 30px;">
          <img
            src="https://ui-avatars.com/api/?name=${
              reportData.user.firstName
            }+${reportData.user.lastName}"
            alt="User Avatar"
            style="width: 150px; height: 150px; border-radius: 50%; border: 2px solid #ddd;"
          />
          <div style="margin-left: 20px;">
            <h2 style="font-size: 40px; font-weight: bold; color: #202046;">
              ${reportData.user.firstName} ${reportData.user.lastName}
            </h2>
            <p style="font-size: 24px; color: #555;">${
              reportData.user.email
            }</p>
          </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 30px;">
          <h3 style="font-size: 32px; font-weight: bold; color: #202046; margin-bottom: 20px;">
            Monthly Requisitions
          </h3>
          <p style="font-size: 24px; color: #555;">Total Requisitions: ${
            reportData.report.userMonthlyRequisitions?.totalMonthlyRequisitions
          }</p>
          <br />
          ${reportData.report.userMonthlyRequisitions?.currentMonthRequisitions?.requisitions
            .map(
              (requisition: Requisition) => `
            <div style="border: 1px solid #ddd; padding: 30px; margin-bottom: 20px; background-color: #f9f9f9;">
              <h4 style="font-size: 28px; font-weight: medium; color: #202046;">
                ${requisition.title}
              </h4>
              <p style="font-size: 20px; color: #555;">${requisition.description}</p>
              <p style="font-size: 20px; color: #202046;">Amount: ${requisition.amount}</p>
              <p style="font-size: 20px; color: #777;">Status: ${requisition.requisitionStatus}</p>
            </div>
          `
            )
            .join("")}
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 30px;">
          <h3 style="font-size: 32px; font-weight: bold; color: #202046; margin-bottom: 20px;">
            Monthly Transactions
          </h3>
          ${reportData.report.userMonthlyTransactions?.currentMonthTransactions?.transactions
            .map(
              (transaction: Transaction) => `
            <div style="border: 1px solid #ddd; padding: 30px; margin-bottom: 20px; background-color: #f9f9f9;">
              <h4 style="font-size: 28px; font-weight: medium; color: #202046;">
                Transaction ID: ${transaction.id}
              </h4>
              <p style="font-size: 20px; color: #555;">Amount: ${transaction.amount}</p>
              <p style="font-size: 20px; color: #202046;">Type: ${transaction.type}</p>
              <p style="font-size: 20px; color: #777;">Requisition ID: ${transaction.requisitionId}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
        : `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff; color: #333;">
        <div style="display: flex; align-items: center; margin-bottom: 30px;">
          <div style="margin-left: 20px;">
            <h2 style="font-size: 40px; font-weight: bold; color: #202046;">
              ${reportData.company.name}
            </h2>
            <p style="font-size: 24px; color: #555;">${
              reportData.company.companyEmail
            }</p>
          </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 30px;">
          <h3 style="font-size: 32px; font-weight: bold; color: #202046; margin-bottom: 20px;">
            Monthly Requisitions
          </h3>
          ${reportData.report.companyMonthlyRequisitions?.currentMonthRequisitions?.requisitions
            .map(
              (requisition: Requisition) => `
            <div style="border: 1px solid #ddd; padding: 30px; margin-bottom: 20px; background-color: #f9f9f9;">
              <h4 style="font-size: 28px; font-weight: medium; color: #202046;">
                ${requisition.title}
              </h4>
              <p style="font-size: 20px; color: #555;">${requisition.description}</p>
              <p style="font-size: 20px; color: #202046;">Amount: ${requisition.amount}</p>
              <p style="font-size: 20px; color: #777;">Status: ${requisition.requisitionStatus}</p>
            </div>
          `
            )
            .join("")}
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 30px;">
          <h3 style="font-size: 32px; font-weight: bold; color: #202046; margin-bottom: 20px;">
            Monthly Transactions
          </h3>
          ${reportData.report.companyMonthlyTransactions?.currentMonthTransactions?.transactions
            .map(
              (transaction: Transaction) => `
            <div style="border: 1px solid #ddd; padding: 30px; margin-bottom: 20px; background-color: #f9f9f9;">
              <h4 style="font-size: 28px; font-weight: medium; color: #202046;">
                Transaction ID: ${transaction.id}
              </h4>
              <p style="font-size: 20px; color: #555;">Amount: ${transaction.amount}</p>
              <p style="font-size: 20px; color: #202046;">Type: ${transaction.type}</p>
              <p style="font-size: 20px; color: #777;">Requisition ID: ${transaction.requisitionId}</p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    document.body.appendChild(tempElement);

    const canvas = await html2canvas(tempElement, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.5);
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);

    document.body.removeChild(tempElement);
  };

  return (
    <button
      onClick={generatePdf}
      className="py-2 px-4 bg-[#202046] text-white rounded-lg hover:bg-[#1a1a38] transition-colors"
    >
      Download Report
    </button>
  );
};

export default DownloadButton;
