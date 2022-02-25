// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error: any) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: any) => Promise.reject(error),
);

export default api;
