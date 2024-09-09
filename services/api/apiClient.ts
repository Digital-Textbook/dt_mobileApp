import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://192.168.80.163:3001",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Optionally: Add request/response interceptors for error handling or token management
apiClient.interceptors.request.use((config) => {
  // Add authorization token here if needed
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally here
    return Promise.reject(error);
  }
);

export default apiClient;
