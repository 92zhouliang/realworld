import axios from 'axios';

const request=axios.create({
    baseURL:'https://conduit.productionready.io'
})

//请求拦截器

request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
//响应拦截器

export default request;