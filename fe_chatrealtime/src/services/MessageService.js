import axios  from "../config/AxiosConfig";


export const findMessageByChatId =  (chatId)=>{
    return axios.get(`/message/${chatId}`);
}
export const createMessage =(data)=>{
    return axios.post('/message',data)
}