import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});
instance.defaults.withCredentials = true;
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error.response.data;
});
export default instance;