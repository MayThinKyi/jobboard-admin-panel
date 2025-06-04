import { ApiConfig } from "@/config/apiConfig";
import { AuthDTO, IUser, IUserResponse, UpdateUserInfoDTO } from "@/types/user";
import { apiService } from "@/utils/apiService";
import get from "lodash/get";

const register = async (body: AuthDTO) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.register}`,
      body,
    );
    return {
      user: get(data.data, "user", {}) as IUser,
      token: get(data.data, "token", "") as string,
    };
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
};

const login = async (body: AuthDTO) => {
  try {
    const { data } = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.login}`,
      body,
    );
    return {
      user: get(data.data, "user", {}) as IUser,
      token: get(data.data, "token", "") as string,
    };
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
};

const getMe = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.me}`,
    );
    return data as IUserResponse<IUser>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
};

const updateMeInfo = async (body: any) => {
  try {
    const { data } = await apiService.put(
      `${ApiConfig.baseUrl}/${ApiConfig.me}`,
      { ...body },
    );
    return data as IUserResponse<IUser>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
};

const updateFavouriteJob = async (jobId: string) => {
  try {
    const { data } = await apiService.put(
      `${ApiConfig.baseUrl}/${ApiConfig.favourites}`,
      { jobId },
    );
    return data as IUserResponse<IUser>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
};

const getFavouriteJobs = async () => {
  try {
    const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.favourites}`,
    );
    return data as IUserResponse<IUser>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
};

export {
  register,
  login,
  getMe,
  updateMeInfo,
  updateFavouriteJob,
  getFavouriteJobs,
};
