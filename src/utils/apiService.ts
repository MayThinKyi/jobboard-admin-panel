import { ApiConfig } from "@/config/apiConfig";
import { clearToken, getToken } from "@/lib/tokenUtils";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiService = axios.create({
  baseURL: ApiConfig.baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  },
);

export { apiService };
