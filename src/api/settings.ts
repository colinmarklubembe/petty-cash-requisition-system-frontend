import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/auth`;

class SettingsApi {
  updateProfile = async (userData: {
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
  }) => {
    try {
      const response = await axios.put(`${API_URL}/update-profile`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  updatePassword = async (userData: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/change-password`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

const settingsApi = new SettingsApi();

export default settingsApi;
