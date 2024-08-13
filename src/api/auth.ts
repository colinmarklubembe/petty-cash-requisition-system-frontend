import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/auth`;

class AuthApi {
  signup = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  login = async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  resetPassword = async (password: string, userId: string) => {
    try {
      const response = await axios.put(`${API_URL}/reset-password/${userId}`, {
        newPassword: password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  inviteUser = async (userData: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const companyId = localStorage.getItem("companyId");
      const response = await axios.post(`${API_URL}/invite-user`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "company-id": `${companyId}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getUsers = async () => {
    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");
    try {
      const response = await axios.get(`${API_URL}/get-users`, {
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

  getCompanyUsers = async () => {
    const companyId = localStorage.getItem("companyId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/get-company-users`, {
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

  getUserById = async (userId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/get-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
}

const authApi = new AuthApi();

export default authApi;
