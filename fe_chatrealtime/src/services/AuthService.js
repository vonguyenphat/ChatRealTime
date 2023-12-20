import axios  from "../config/AxiosConfig";

export const registerNewUser = (name,username,password) => {
    return axios.post('/auth/register', {
        name,
        username,
        password
    });
}
export const loginUser = (username,password) => {
    return axios.post('/auth/login',{
        username,
        password
    });
}
export const forgotPassword = (data) => {
    return axios.post('/auth/forgot-password',{data});
}
export const getUserAccount= () =>{
    return axios.get('/auth/account');
}

