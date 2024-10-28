import apiClient from "../apiClient"

const verifyEmail = async (user_id: string, otp: string) => {
    const response = await apiClient.post(`/digital-textbook/user/${user_id}/reset-password/${otp}`);
    return response.data;
}

export default verifyEmail;
