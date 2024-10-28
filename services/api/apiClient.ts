import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URI,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
console.log(process.env.EXPO_PUBLIC_API_URI);
apiClient.interceptors.request.use((config) => {
  // Add authorization token here if needed
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    return Promise.reject(error);
  }
);

export default apiClient;
