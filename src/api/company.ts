import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/companies`;

class CompanyApi {
  getCompanies = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/get-user-companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  createCompany = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${API_URL}/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  editCompany = async (companyId: string, data: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/update-company/${companyId}`,
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

  removeUserFromCompany = async (userId: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/company/remove-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "company-id": localStorage.getItem("companyId"),
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
}

const companyApi = new CompanyApi();

export default companyApi;
