

/**
 *  axios 在组件中作请求时是常见的 promise then.catch  alova 则是 
    const { 
      // loading是加载状态值，当加载时它的值为true，结束后自动更新为false
      // 它是一个Ref类型的值，你可以通过loading.value访问它，或直接绑定到界面中
      loading,

      // 响应数据
      data: todoList,

      // 请求错误对象，请求错误时有值，否则为undefined
      error,

      // 成功回调绑定
      onSuccess,

      // 失败回调绑定
      onError,

      // 完成回调绑定
      onComplete,} = useRequest(alovaInstance.Get(''))  // useRequest 是alova 提供的方法 直接引入 
    onSuccess (res=>{
      res // res 操作
    })

    如果要 vue(watch) react(useEffect) 中做 网络请求   可以用 alova 的useWatcher进行处理
    const {onSuccess , onError } =  useWatcher(alovaInstance.Get(''),[监听参数])
 * 
 * 
 */


// import AX from "./axiosBase";
import AL from './alovaBase';

export const Menu = {
  base() {
    return AL.Get('/menu')
  },
  user() {
    // return AX.get('/menu-user')
    return AL.Get('/menu-user')
  },
  synergy() {
    console.log(12)
    // return AX.get('/menu-synergy')
    return AL.Get('/menu-synergy')
  },
  business() {
    return AL.Get('/menu-business')
  },
  setting() {
    return AL.Get('/menu-setting')
  }
}

