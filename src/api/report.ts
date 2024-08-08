import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/reports`;

class ReportApi {
  async getUserReport(userId: string, selectedDate?: string) {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");

    try {
      const url = new URL(`${API_URL}/user/${userId}`);

      if (selectedDate) {
        url.searchParams.append("selectedDate", selectedDate);
      }

      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "company-id": `${companyId}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getCompanyReport(selectedDate?: string) {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");

    try {
      const url = new URL(`${API_URL}/company`);

      if (selectedDate) {
        url.searchParams.append("selectedDate", selectedDate);
      }

      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "company-id": `${companyId}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

const reportApi = new ReportApi();

export default reportApi;
