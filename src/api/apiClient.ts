import axios, { AxiosInstance, AxiosError } from 'axios';
import { errorHandler } from '../utils/errorHandler';


// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = "fa66abff-98c2-4122-8997-b767836bf956";

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