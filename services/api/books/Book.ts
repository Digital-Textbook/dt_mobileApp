

// import axios from 'axios';

// const API_URL = 'http://192.168.101.6:3001/textbook';

// export const fetchTextbookDetails = async (id: string) => {
//   try {
//     const response = await axios.post(`${API_URL}/fetch-details`, { id });
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to fetch textbook details');
//   }
// };


import axios from 'axios';

const API_URL = 'http://192.168.101.15:3001/textbook';
// const API_URL = 'http://172.20.10.7:3001/textbook';


export const fetchTextbookDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/textbook-details`, {
      responseType: 'blob', // Set response type to blob for binary data
    });
    // Handle the binary data, e.g., download or display
    return response.data;
  } catch (error) {
    console.error('Error fetching textbook details:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch textbook details');
  }
};


