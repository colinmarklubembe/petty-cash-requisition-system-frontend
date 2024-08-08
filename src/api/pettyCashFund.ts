import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/funds`;

class PettyCashApi {
  getPettyCashFunds = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.get(`${API_URL}/get-all`, {
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

  createPettyCashFund = async (data: any) => {
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

  updatePettyCashFund = async (fundId: string, data: any) => {
    try {
      const response = await axios.put(`${API_URL}/update/${fundId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  deletePettyCashFund = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "company-id": `${localStorage.getItem("companyId")}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  getPettyCashFundById = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/fund/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
}

const pettyCashApi = new PettyCashApi();

export default pettyCashApi;
