


// https://blog.csdn.net/u012573773/article/details/126520771
// https://zhuanlan.zhihu.com/p/564372267

import { createAlova } from "alova";
import globalFetch from 'alova/GlobalFetch'
import ReactHook from 'alova/react'

const AL = createAlova({
  // 假设我们需要与这个域名的服务器交互
  baseURL: 'http://localhost:5222',
  // 在vue项目下引入VueHook，它可以帮我们用vue的ref函数创建请求相关的，可以被alova管理的状态
  statesHook: ReactHook,
  // 请求适配器，这里我们使用fetch请求适配器
  requestAdapter: globalFetch(),
  // 设置全局的请求拦截器，与axios相似
  beforeRequest(config) {
    console.log(20, config)
    // 假设我们需要添加token到请求头
    // config.headers.token = 'token';
  },

  // 响应拦截器，也与axios类似
  async responsed(response, config) {
    console.log(25, response, config)
    const json = await response.json();
    console.log(29, json)
    return json;
  },
  // responded: {
  //   onSuccess: async (response, method) => {
  //     const json = await response.json()
  //     console.log(37, response, json, json.data)
  //     return json
  //   },
  //   onError: (error, method) => {
  //     throw new Error(error)
  //   }
  // },
  timeout: 12e4

})

export default AL