// import axios from 'axios';

// const minIOClient = axios.create({
//   baseURL: 'http://192.168.101.12:9000', 
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// minIOClient.interceptors.request.use((config) => {
//   return config;
// });

// minIOClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const getFileUrl = (filePath: string) => `${minIOClient.defaults.baseURL}/${filePath}`;

// export default minIOClient;




// import axios from 'axios';
// import * as SecureStore from 'expo-secure-store';

// const TOKEN_KEY = 'jwt'; 

// const minIOClient = axios.create({
//     baseURL: 'http://192.168.101.12:9000', 
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     },
// });

// const getToken = async () => {
//     try {
//         const token = await SecureStore.getItemAsync(TOKEN_KEY); 
//         if (!token) {
//             console.warn('No token found in SecureStore.');
//         } else {
//             console.log('Retrieved Token:', token); 
//         }
//         return token;
//     } catch (error) {
//         console.error('Error retrieving token from SecureStore:', error);
//         throw new Error('Token retrieval failed');
//     }
// };

// minIOClient.interceptors.request.use(async (config) => {
//     try {
//         const token = await getToken(); 
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`; 
//             console.log('Authorization Header Set:', config.headers['Authorization']);
//         }
//         return config;
//     } catch (error) {
//         console.error('Error in request interceptor:', error);
//         return Promise.reject(error);
//     }
// });


// minIOClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         console.error('Error Response Data:', error.response?.data);
//         console.error('Error Status Code:', error.response?.status);
//         console.error('Error Headers:', error.response?.headers);

        
//         if (error.response?.status === 403) {
//             console.error('403 Forbidden: Token might be invalid or expired');
//         }
//         return Promise.reject(error);
//     }
// );

// // Function to construct file URL
// export const getFileUrl = (filePath: string) => `${minIOClient.defaults.baseURL}/${filePath}`;

// export default minIOClient;





import axios from 'axios';

const minIOClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MINIO_API_URI, 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

console.log(process.env.EXPO_PUBLIC_MINIO_API_URI)
minIOClient.interceptors.request.use((config) => {
  console.log('Request made with ', config); 
  return config;
});


minIOClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
   
    console.error('Error Response Data:', error.response?.data);
    console.error('Error Status Code:', error.response?.status);
    console.error('Error Headers:', error.response?.headers);
    
    if (error.response?.status === 403) {
      console.error('403 Forbidden: Access denied');
      console.log(error);
    }
    
    return Promise.reject(error); 
  }
);


export const getFileUrl = (filePath: string) => `${minIOClient.defaults.baseURL}/${filePath}`;


export default minIOClient;
