import axios  from "../config/AxiosConfig";

export const getChatByUserId = async (userId)=>{
    return   axios.get(`/chat/${userId}`);
}