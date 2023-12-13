// src/api/axios-instance.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
   baseURL: 'https://localhost:7201/api',
   // baseURL: 'http://ghostrider5024-001-site1.atempurl.com/api',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json',
   },
});

// Interceptors để xử lý các request trước khi chúng được gửi
instance.interceptors.request.use(
   (config: any) => {
      // Bạn có thể thêm logic xử lý request ở đây
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

// Interceptors để xử lý các response trước khi chúng được trả về
instance.interceptors.response.use(
   (response: AxiosResponse) => {
      // Bạn có thể thêm logic xử lý response ở đây
      return response;
   },
   (error) => {
      return Promise.reject(error);
   },
);

export default instance;
