import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/requisitions`;

class RequisitionService {
  createRequisition = async (data: any) => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.post(`${API_URL}/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "company-id": `${companyId}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  updateRequisition = async (requisitionId: string, data: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/update/${requisitionId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  getUserRequisitions = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.get(`${API_URL}/user-requisitions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "company-id": `${companyId}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  getAllRequisitions = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.get(`${API_URL}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "company-id": `${companyId}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  getRequisitionById = async (requisitionId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/get-requisition/${requisitionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  deleteRequisition = async (requisitionId: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/delete-requisition/${requisitionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "company-id": `${localStorage.getItem("companyId")}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
}

const requisitionApi = new RequisitionService();

export default requisitionApi;
