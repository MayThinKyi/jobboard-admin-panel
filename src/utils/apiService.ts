import { ApiConfig } from "@/config/apiConfig";
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
    return Promise.reject(error);
  },
);

export { apiService };
