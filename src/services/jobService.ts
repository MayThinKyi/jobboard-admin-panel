import { ApiConfig } from "@/config/apiConfig";
import { CreateJobDTO, IJob, IJobResponse } from "@/types/job";
import { apiService } from "@/utils/apiService";
import get from "lodash/get";

const fetchJobs = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.jobs}`,
    );
    return data as IJobResponse<IJob[]>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const fetchJobById = async (id: string) => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.jobs}/${id}`,
    );
    return data as IJobResponse<IJob>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const createJob = async (body: CreateJobDTO) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.jobs}`,
      body,
    );
    return data as IJobResponse<IJob>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};
const updateJob = async (id: string, body: CreateJobDTO) => {
  try {
    const { data } = await apiService.put(
      `${ApiConfig.baseUrl}/${ApiConfig.jobs}/${id}`,
      body,
    );
    return data as IJobResponse<IJob>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

const deleteJob = async (id: string) => {
  try {
    const { data } = await apiService.delete(
      `${ApiConfig.baseUrl}/${ApiConfig.jobs}/${id}`,
    );
    return data as IJobResponse<null>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
  }
};

export { fetchJobs, fetchJobById, createJob, deleteJob, updateJob };
