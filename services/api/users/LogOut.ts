
import apiClient from '../apiClient';

export const logoutUser = async (userId: any) => {
    try {
        const response = await apiClient.post(`digital-textbook/auth/${userId}/user-logout`); 
        return response.data;
    } catch (error) {
        console.error("Logout request failed:", error.response ? error.response.data : error);
        throw error;
    }
};



