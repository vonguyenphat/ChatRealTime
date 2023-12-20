import axios  from "../config/AxiosConfig";

export const findUserById =(id) => {
    return axios.get(`/user/find-user-by-id/${id}`);
}