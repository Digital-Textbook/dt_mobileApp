import apiClient from "../apiClient"

const login = async (cidNo: string, password: string) => {
    return await apiClient.post('/auth/login', { cidNo, password });
}

export default login;
