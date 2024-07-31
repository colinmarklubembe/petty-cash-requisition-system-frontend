import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

class ReportApi {
  async getAllReports() {
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

  async getReportById(reportId: string) {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/get-report/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createReport(reportData: any) {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    const response = await axios.post(`${API_URL}/create-report`, reportData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });

    return response.data;
  }

  async updateReport(reportId: string, reportData: any) {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${reportId}`, reportData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async deleteReport(reportId: string) {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/delete/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

const reportApi = new ReportApi();

export default reportApi;
