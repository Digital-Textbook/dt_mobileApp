
// import minIOClient from '../minIOClient';

// // Function to fetch textbooks
// export const fetchTextbooks = async () => {
//     try {
//         const response = await minIOClient.get('/digital-textbook/textbook/all');
//         console.log(response)
//         return response.data; 
//     } catch (error) {
//         console.error("Error fetching textbooks:", error);
//         throw error;
//     }
// };


import apiClient from '../apiClient';

export const fetchTextbooks = async () => {
    try {
        const response = await apiClient.get('/digital-textbook/textbook/all');
        console.log('Fetched Textbooks:', response.data); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching textbooks:", error.message);
        throw error; 
    }
};
