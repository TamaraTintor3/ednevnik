import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Accept: "*/*",
        'Content-Type': 'application/json',
      },

});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
  
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      if (error && error.response && error.response.status === 401) {
        console.log(error);
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;