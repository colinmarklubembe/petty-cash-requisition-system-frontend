import axios from "axios";

const API_URL = "http://localhost:5000/api/requisitions";

class ApprovalApi {
  approveRequisition = async (requisitionId: string) => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.put(
        `${API_URL}/approvals/approve/${requisitionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "company-id": `${companyId}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  rejectRequisition = async (requisitionId: string) => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    const response = await axios.put(
      `${API_URL}/approvals/reject/${requisitionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "company-id": `${companyId}`,
        },
      }
    );

    return response.data;
  };

  async getAllApprovals() {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });

    return response.data;
  }
}

const approvalApi = new ApprovalApi();

export default approvalApi;
