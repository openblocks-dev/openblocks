import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { REQUEST_TIMEOUT_MS, SERVER_HOST } from "constants/apiConstants";
import {
  apiFailureResponseInterceptor,
  apiRequestInterceptor,
  apiSuccessResponseInterceptor,
} from "api/apiUtils";
import { API_REQUEST_HEADERS } from "constants/apiConstants";

const apiRequestConfig: AxiosRequestConfig = {
  baseURL: `${SERVER_HOST}/api/`,
  timeout: REQUEST_TIMEOUT_MS,
  headers: API_REQUEST_HEADERS,
  withCredentials: true,
};

const axiosInstance: AxiosInstance = axios.create(apiRequestConfig);

axiosInstance.interceptors.request.use(apiRequestInterceptor);
axiosInstance.interceptors.response.use(
  apiSuccessResponseInterceptor,
  apiFailureResponseInterceptor
);

class Api {
  static get(url: string, queryParams?: any, config: Partial<AxiosRequestConfig> = {}) {
    return axiosInstance.request({
      url,
      method: "GET",
      params: queryParams,
      ...config,
    });
  }

  static post(
    url: string,
    body?: any,
    queryParams?: any,
    config: Partial<AxiosRequestConfig> = {}
  ) {
    return axiosInstance.request({
      method: "POST",
      url,
      data: body,
      params: queryParams,
      ...config,
    });
  }

  static put(url: string, body?: any, queryParams?: any, config: Partial<AxiosRequestConfig> = {}) {
    return axiosInstance.request({
      method: "PUT",
      url,
      params: queryParams,
      data: body,
      ...config,
    });
  }

  static patch(
    url: string,
    body?: any,
    queryParams?: any,
    config: Partial<AxiosRequestConfig> = {}
  ) {
    return axiosInstance.request({
      method: "PATCH",
      url,
      data: body,
      params: queryParams,
      ...config,
    });
  }

  static delete(url: string, queryParams?: any, config: Partial<AxiosRequestConfig> = {}) {
    return axiosInstance.request({
      method: "DELETE",
      url,
      params: queryParams,
      ...config,
    });
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export default Api;
