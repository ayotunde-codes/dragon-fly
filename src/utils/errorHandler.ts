import { AxiosError } from 'axios';

export const errorHandler = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Response Error:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request Error:', error.request);
  } else {
    // Something happened in setting up the request
    console.error('Error:', error.message);
  }
};