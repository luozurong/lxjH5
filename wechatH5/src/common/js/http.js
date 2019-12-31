/**
 * Created by Administrator on 2017/4/11.
 */
import axios from 'axios';

var url = window.location.host;
var reg = RegExp(/tt/);
var regLocal = RegExp(/localhost/);

if(url.match(reg) || url.match(regLocal)) var baseURL = 'https://tt.hori-gz.com:8443';
else var baseURL = 'https://mms.hori-gz.com';

// 添加响应拦截器
axios.interceptors.request.use(function (config) {
 // 配置发送请求的信息
 return config;
}, function (error) {
 return Promise.reject(error);
});
 
axios.interceptors.response.use(function (response) {
 // 配置请求回来的信息
 
 return response;
}, function (error) {
 return Promise.reject(error);
});
 
var http = axios.create({
	//withCredentials: true, // 允许跨域 cookie
    //headers: {'Access-Control-Allow-Origin': 'XMLHttpRequest'},
    timeout: 12000, /*设置请求超时时间*/
    baseURL: baseURL, 
 
});
 
// Alter defaults after instance has been created
http.defaults.headers.common['Authorization'] = '';
 
export default http; 