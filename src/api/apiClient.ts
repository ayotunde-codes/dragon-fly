import axios, { AxiosInstance, AxiosError } from 'axios';
import { errorHandler } from '../utils/errorHandler';


const API_KEY = import.meta.env.VITE_APP_API_KEY;

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://staging.api.dragonflyai.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (API_KEY) {
    config.headers['Authorization'] = API_KEY;
  } else {
    console.error('API key is missing. Please provide the API key in the environment variable.');
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    errorHandler(error);
    return Promise.reject(error);
  }
);

export default apiClient;