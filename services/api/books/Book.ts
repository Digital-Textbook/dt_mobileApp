

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

export const fetchTextbookDetails = async (id: string) => {
  console.log(`${process.env.EXPO_PUBLIC_API_URI}/digital-textbook/textbook/${id}/textbook-info`)
  try {
  console.log("HELLO: " + process.env.EXPO_PUBLIC_API_URI)
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URI}/digital-textbook/textbook/${id}/textbook-info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching textbook details:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch textbook details');
  }
};


