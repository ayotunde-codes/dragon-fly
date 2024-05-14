export interface UploadUrlResponse {
    key: string;
    url: string;
  }
  
  export interface ProcessResponse {
    taskId: string;
  }
  
  export interface StatusResponse {
    status: string;
  }
  
  export interface UploadedFile {
    file: File;
    status: 'uploading' | 'processing' | 'completed' | 'failed';
    taskId: string | null;
  }