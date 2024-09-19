// import apiClient from "../apiClient";

// const logoutUser = async (userId: string) => {
//     try {
//         const response = await apiClient.post(`/auth/${userId}/user-logout`);
//         return response.data;
//     } catch (error) {
//         throw new Error("Logout API failed"); // Throw error if API fails
//     }
// };

// export default logoutUser;

import apiClient from "../apiClient";

const logoutUser = async (user_id: string): Promise<boolean> => {
    try {
        const response = await apiClient.post(`/auth/${user_id}/user-logout`);
        return response.data; // Assuming response.data is a boolean
    } catch (error) {
        console.error("Logout API call failed:", error);
        throw new Error("Logout API failed");
    }
};

export default logoutUser;

