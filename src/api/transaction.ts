import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

class TransactionApi {
  async getAllTransactions() {
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");
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
  }

  async getTransactionById(transactionId: string) {
    try {
      const response = await axios.get(`${API_URL}/${transactionId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async createTransaction(transactionData: any) {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.post(
        `${API_URL}/create-transaction`,
        transactionData,
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
  }

  async updateTransaction(transactionId: string, transactionData: any) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${API_URL}/${transactionId}`,
        transactionData,
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
  }

  async deleteTransaction(transactionId: string) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${API_URL}/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

const transactionApi = new TransactionApi();

export default transactionApi;
