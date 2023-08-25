

### 关于用到的地图 key这些关键隐私 数据单独写一个js文件放置 在提交 git 更新时 进行屏蔽忽略提交 


#### ReferenceError: $RefreshSig$ is not defined ### 
1. npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh cross-env
2. webpack.dev.js
  ``` javascript 
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

  module.exports = {
    ...,
    mode: 'development',
    plugins: [
      new ReactRefreshWebpackPlugin()
    ]
  }

  ```
3. .babelrc.js  
![babel 更多](https://zhuanlan.zhihu.com/p/394783228)
``` javascript 
  module.exports = function(api) {
  return {
    "presets": [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          "runtime": "automatic"
        }
      ],
      "@babel/preset-typescript"
    ],
    // 生产环境不使用react-refresh/babel
    "plugins": api.env("production") ?
      [
        "@babel/plugin-transform-runtime"
      ] :
      [
        "@babel/plugin-transform-runtime",
        "react-refresh/babel"
      ]
  }
}

```
4. package.json 启动项

``` json
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack serve --config config/webpack.config.js --env env=dev --history-api-fallback",
    "build": "cross-env NODE_ENV=production webpack --config config/webpack.config.js --env env=prod"
  },

``` 
5. react中用useEffect模拟组件生命周期
[!csdn](https://blog.csdn.net/weixin_40052063/article/details/125430853)

``` javascript 

useEffect (()=>{
  console.log('didMount , didUpdate')
})

useEffect(()=>{
  console.log('componentDidMount')
},[])

useEffect(()=>{
  console.log('componentDidUpdate)
},[count,name])

// class组件 componentDidMount 和 componentWillUnmount 
useEffect(()=>{
  let timerId = setInterval(()=>{
    console.log(Date.now())
  },1e3)

  return () => {
    window.clearInterval(timer)
  }
},[])

```

react-tabs 

  多个路由 有登录权限设置 路由中有 meta字段 表示是否要在tabs中展示 有部分页面是不在tabs中展示的 
    meta : { auth : 权限字段 ,  tabs : 是否是tabs 路由 ,  title : 标题 }
  错误路由 错误路由信息(route.errorElement route.loader route.lazy...)  




