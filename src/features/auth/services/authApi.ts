import axios from "axios";

const API_URL = "https://api.example.com";

export const signupApi = async (data: any) => {
  const response = await axios.post(`${API_URL}/signup`, data);
  return response.data;
};