import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import log from "loglevel";
import { ApiResponse } from "./apiResponse";

const SERVER_HOST = process.env.API_HOST ?? "";
const REQUEST_TIMEOUT_MS = 20000;
const API_REQUEST_HEADERS = {
  "Content-Type": "application/json",
};

function apiFailureResponseInterceptor(error: any) {
  if (axios.isAxiosError(error)) {
    let message = `AxiosError:${error.code}`;
    const response = error.response;
    if (response) {
      message = message + ` status:${response.status}`;
      if (response.data) {
        const data = response.data as ApiResponse;
        message = message + ` code:${data.code} message:${data.message}`;
      }
    } else if (error.request) {
      log.error(error.request);
    } else {
      log.error("Error", error.message);
    }
    return Promise.reject(message);
  }
  return Promise.reject(error);
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${SERVER_HOST}/api/`,
  timeout: REQUEST_TIMEOUT_MS,
  headers: API_REQUEST_HEADERS,
  withCredentials: true,
});
axiosInstance.interceptors.request.use((c) => c);
axiosInstance.interceptors.response.use((r) => r, apiFailureResponseInterceptor);

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
