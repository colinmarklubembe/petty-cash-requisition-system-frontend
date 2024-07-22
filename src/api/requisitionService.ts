import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Replace with your backend URL

class RequisitionService {
  createRequisition = async (data: any) => {
    const response = await axios.post(`${API_URL}/requisitions`, data);
    return response.data;
  };
}

const requisitionService = new RequisitionService();

export default requisitionService;
