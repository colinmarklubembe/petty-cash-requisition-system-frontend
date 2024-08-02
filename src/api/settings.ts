import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL!}/auth`;

class SettingsApi {
  updateProfile = async (userData: {
    email: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, userData);

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
}

const settingsApi = new SettingsApi();

export default settingsApi;
