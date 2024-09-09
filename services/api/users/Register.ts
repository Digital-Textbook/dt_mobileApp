import apiClient from "../apiClient";

const USER_TYPE = 'BhutaneseCid';

const register = async (params: any) : Promise<any> => {
    params['userType'] = USER_TYPE;
    const formattedReqBody = JSON.stringify(params);

    return await apiClient.post('/user/register', formattedReqBody);
}

export default register;
