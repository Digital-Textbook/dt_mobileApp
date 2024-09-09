import apiClient from "../apiClient"

const verifyEmail = async (user_id: string, otp: string) => {
    const response = await apiClient.post(`/user/${user_id}/verifyOtpEmail/${otp}`);
    return response.data;
}

export default verifyEmail;
