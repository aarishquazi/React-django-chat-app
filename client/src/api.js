import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "./constant";

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Headers:", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;