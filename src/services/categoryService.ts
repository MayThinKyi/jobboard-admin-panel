import { ApiConfig } from "@/config/apiConfig";
import {  ICategory, ICategoryResponse } from "@/types/category";
import { apiService } from "@/utils/apiService";
import get from "lodash/get";

const fetchCategories = async()=>{
    try {
         const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.categories}`
    );
    return data as ICategoryResponse<ICategory[]>;
    } catch (error) {
         console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
    }
}

const fetchCategoryById = async(id:string)=>{
      try {
         const { data } = await apiService.get(
      `${ApiConfig.baseUrl}/${ApiConfig.categories}/${id}`
    );
    return data as ICategoryResponse<ICategory>;
    } catch (error) {
         console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
    }
}

const createCategory = async(body:{name:string})=>{
     try {
    const  {data} = await apiService.post(
      `${ApiConfig.baseUrl}/${ApiConfig.categories}`,
      body
    );
    return data as ICategoryResponse<ICategory>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
}

const deleteCategory = async(id:string)=>{
      try {
         const { data } = await apiService.delete(
      `${ApiConfig.baseUrl}/${ApiConfig.categories}/${id}`
    );
    return data as ICategoryResponse<null>;
    } catch (error) {
         console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.message")}`);
    }
}
const updateCategory = async (id:string,body:{name?:string})=>{
       try {
    const  {data} = await apiService.put(
      `${ApiConfig.baseUrl}/${ApiConfig.categories}/${id}`,
      body
    );
    return data as ICategoryResponse<ICategory>;
  } catch (error) {
    console.error(error);
    if (get(error, "response", undefined)) {
      console.error("Error Status Code:", get(error, "response.status"));
      console.error("Error Response Data:", get(error, "response.data"));
    }
    throw new Error(`${get(error, "response.data.data")}`);
  }
}

export {
    fetchCategories,
    fetchCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
}