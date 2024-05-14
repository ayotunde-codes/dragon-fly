
import { UploadUrlResponse, ProcessResponse, StatusResponse } from '../types/fileUpload';
import axios from 'axios';
import apiClient from './apiClient';

export const generateUrl = async (): Promise<UploadUrlResponse> => {
  const response = await apiClient.post<UploadUrlResponse>('/pipeline/assets/stage');
  return response.data;
};

export const uploadToS3 = async (file: File, url: string): Promise<void> => {
  await axios.put(url, file, {
    headers: { 'Content-Type': file.type },
  });
};

export const processFile = async (key: string): Promise<ProcessResponse> => {
  const response = await apiClient.post<ProcessResponse>(
    '/pipeline/assets/process',
    `key=${key}&pipeline=dragonfly-img-basic`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data;
};

export const checkStatus = async (taskId: string): Promise<StatusResponse> => {
  const response = await apiClient.post<StatusResponse>(
    '/pipeline/assets/status',
    { taskId },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
  return response.data;
};