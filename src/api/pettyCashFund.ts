import axios from "axios";

const API_URL = "http://localhost:5000/api/funds";

class PettyCashApi {
  getPettyCashFunds = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    const response = await axios.get(`${API_URL}/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });

    return response.data;
  };

  createPettyCashFund = async (data: any) => {
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

  updatePettyCashFund = async (fundId: string, data: any) => {
    const response = await axios.put(`${API_URL}/update/${fundId}`, data);

    return response.data;
  };

  deletePettyCashFund = async (id: string) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`);

    return response.data;
  };

  getPettyCashFundById = async (id: string) => {
    const response = await axios.get(`${API_URL}/fund/${id}`);

    return response.data;
  };
}

const pettyCashApi = new PettyCashApi();

export default pettyCashApi;
