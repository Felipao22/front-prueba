import axios from "axios";

const apiBaseUrl = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

export default apiClient;
