import apiClient from "../apiClient"

const forgotPassword = async (email: string) => {
    return await apiClient.post(`/digital-textbook/user/forgot-password/${email}`);
}

export default forgotPassword;
