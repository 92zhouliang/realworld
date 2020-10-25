import axios from 'axios';

export const request = axios.create({
    baseURL:'https://conduit.productionready.io'
})

//插件导出函数必须为default成员（唯一）
//请求拦截器
export default ({store})=>{
    request.interceptors.request.use(function (config) {
        const { user } = store.state;
        if(user && user.token) {
            config.headers.Authorization=`Token ${user.token}`
        }
        // Do something before request is sent
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
}
