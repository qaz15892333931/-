import axios from "axios";
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // baseURL:"https://weixin.abzc.net", // api 的 base_url
  baseURL: "http://192.168.1.189:8080", // api 的 base_url

  // timeout: 2000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = "Bearer " + token // 让每个请求携带自定义token 请根据实际情况自行修改
      // 在发起请求前，给所有请求的头部添加token
    }
    return config
  },
  error => {
    // console.log(error)
    // Promise.reject(error)
    // 对请求失败做处理
    return Promise.reject(error);
  }
)
// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code == 401) {
    console.log("响应拦截")
    // message.error('This is a normal message')
    // this.$message.error(res.data.msg)
    alert(res.data.msg)
    window.location.href = "/home"
    // 删除token以及user
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return false;
  }
  // else if (code === -104) {
  //   ElementUI.Message({
  //     message: '系统异常',
  //     type: 'warning'
  //   });
  //   return false;
  // }
  return res.data
},
  error => {
    Promise.reject(error)
  }
);


export default service;