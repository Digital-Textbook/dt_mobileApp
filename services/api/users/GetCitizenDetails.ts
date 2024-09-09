import apiClient from "../apiClient";

interface CitizenshipDetailInterface {
    cidNo: string | null;
    name: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    contactNo: string | null;
};

const getCitizenDetails = async (cid_number: string) : Promise<CitizenshipDetailInterface> => {
    const response = await apiClient.post(`/user/getCidDetail/${cid_number}`, {});
    return response.data;
}

export default getCitizenDetails;
