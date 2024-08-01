import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/companies`;

class CompanyApi {
  getCompanies = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/get-user-companies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  createCompany = async (data: any) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
}

const companyApi = new CompanyApi();

export default companyApi;
