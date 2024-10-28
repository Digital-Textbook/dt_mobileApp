import apiClient from "../apiClient"

const updatePassword = async (user_id: string, password: string) => {
    return apiClient.post(`/digital-textbook/user/${user_id}/update-password/${password}`);
}

export default updatePassword;
