import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/auth`;

class UserApi {
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
    const response = await axios.get(`${API_URL}/get-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });

    return response.data;
  };

  getCompanyUsers = async () => {
    const companyId = localStorage.getItem("companyId");
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/get-company-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "company-id": `${companyId}`,
      },
    });

    return response.data;
  };
}

const userApi = new UserApi();

export default userApi;
