import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/dashboard`;

class DashboardApi {
  async getAdminDashboardData() {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.get(`${API_URL}/admin`, {
        headers: {
          "company-id": `${companyId}`,
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

const dashboardApi = new DashboardApi();

export default dashboardApi;
