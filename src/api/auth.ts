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
}

const authApi = new AuthApi();

export default authApi;
