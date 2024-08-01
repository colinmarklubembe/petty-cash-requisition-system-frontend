import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/requisitions`;

class RequisitionService {
  createRequisition = async (data: any) => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    const response = await axios.post(`${API_URL}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });
    return response.data;
  };

  getUserRequisitions = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    const response = await axios.get(`${API_URL}/user-requisitions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });

    return response.data;
  };

  getAllRequisitions = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });

    return response.data;
  };

  getRequisitionById = async (requisitionId: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/get-requisition/${requisitionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };
}

const requisitionApi = new RequisitionService();

export default requisitionApi;
