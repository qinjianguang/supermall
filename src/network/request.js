import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: "http://152.136.185.210:8000/api/w6",
        timeout: 5000,
    });

    //请求拦截器
    instance.interceptors.request.use(config => {
       // console.log(config);
        return config;
    }, err => {
        console.log(err);
    });
    // 响应式拦截
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    });

    return instance(config);
}
