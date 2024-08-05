import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Report } from "../../types/Report";
import { Requisition } from "../../types/Requisition";
import { Transaction } from "../../types/Transaction";

interface DownloadButtonProps {
  data: Report;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data, fileName }) => {
  const generatePdf = async () => {
    const { user, report: reportData } = data;
    const { userMonthlyRequisitions, userMonthlyTransactions } = reportData;
    const { currentMonthRequisitions, totalMonthlyRequisitions } =
      userMonthlyRequisitions;
    const { currentMonthTransactions } = userMonthlyTransactions;

    const content = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff; color: #333;">
        <div style="display: flex; align-items: center; margin-bottom: 30px;">
          <img
            src="https://ui-avatars.com/api/?name=${user.firstName}+${
      user.lastName
    }"
            alt="User Avatar"
            style="width: 150px; height: 150px; border-radius: 50%; border: 2px solid #ddd;"
          />
          <div style="margin-left: 20px;">
            <h2 style="font-size: 40px; font-weight: bold; color: #202046;">
              ${user.firstName} ${user.lastName}
            </h2>
            <p style="font-size: 24px; color: #555;">${user.email}</p>
          </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 30px;">
          <h3 style="font-size: 32px; font-weight: bold; color: #202046; margin-bottom: 20px;">
            Monthly Requisitions
          </h3>
          <p style="font-size: 24px; color: #555;">Total Requisitions: ${totalMonthlyRequisitions}</p>
          <br />
          ${currentMonthRequisitions.requisitions
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
          ${currentMonthTransactions.transactions
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

    // Create a temporary container to render HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    document.body.appendChild(tempElement);

    // Use html2canvas to capture the HTML content
    const canvas = await html2canvas(tempElement, {
      scale: 2, // Adjust the scale to balance quality and file size
      useCORS: true, // Enable Cross-Origin Resource Sharing for images
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.5); // Compress image to 50% quality
    const pdf = new jsPDF({
      orientation: "p", // Portrait
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
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
