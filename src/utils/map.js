import {
  BAIDU_MAP_KEY,
  QQ_MAP_KEY,      // 腾讯地图key
  GD_MAP_KEY
} from '@/keys.js'

// 获取地理位置 经纬度
export function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(res => {
      let geo = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      }
      callback(geo)
    }, error => {
      console.log(10, error)
      let geo = {
        lat: 30.5567,
        lng: 104.0619
      }
      callback(geo)
    })
  } else {
    console.info("你的浏览器不支持获取地理位置信息。");
    let geo = {
      cname: '四川省成都市'
    }
    callback(geo)
  }
}



// 加载百度地图 gl
export function loadBMapGL() {
  return new Promise((resolve, reject) => {
    let scriptBMapGL = document.createElement('script')
    scriptBMapGL.type = 'text/javascript'
    scriptBMapGL.id = 'scriptBMapGL'
    scriptBMapGL.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${BAIDU_MAP_KEY}&callback=onBMapInitialize`
    scriptBMapGL.onerror = function (error) {
      console.log('scriptBMapGL error', error)
      reject(error)
    }
    window.onBMapInitialize = function (res) {
      console.log('scriptBMapGL init', window?.BMapGL)
      resolve(window?.BMapGL)
    }
    document.body.appendChild(scriptBMapGL)
  })
}
// 加载百度地图
export function loadBMap() {
  return new Promise((resolve, reject) => {
    loadBMapMain().then(response => {
      asyncLoad()
      resolve(response)
      async function asyncLoad() {
        let plugins = [
          `http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay.js`,
          `http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js`
        ]
        let _plugin
        for (let i = 0; i < plugins.length; i++) {
          _plugin = await loadBMapBranch(plugins[i])
          console.log(98, i, _plugin)
        }
      }
    }).catch(error => reject(error))
  })
}

// 百度地图 v3 主分支代码 
export function loadBMapMain() {
  return new Promise((resolve, reject) => {
    let scriptBMap = document.createElement('script')
    scriptBMap.type = 'text/javascript'
    scriptBMap.id = 'scriptBMap'
    scriptBMap.src = `http://api.map.baidu.com/api?v=3.0&ak=${BAIDU_MAP_KEY}&callback=onBMapCallback`
    scriptBMap.onerror = function (error) {
      console.log('scriptBMap error', error)
      reject(error)
    }
    window.onBMapCallback = function () {
      console.log('scriptMap init', window?.BMap)
      resolve(window?.BMap)
    }
    document.body.appendChild(scriptBMap)
  })
}
// 百度地图 v3 功能分支js
export function loadBMapBranch(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 加载腾讯地图 libraries库 {geometry:几何运算 , place : 关键字搜索 , convertor:坐标转换 , drawing:绘图 ,   visualization:热力图}
export function loadQQMap(libraries = 'place , visualization') {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.id = 'TencentMap'
    script.type = 'text/javascript'
    script.src = `http://map.qq.com/api/js?v=2.exp&callback=init&libraries=${libraries}&key=${QQ_MAP_KEY}`
    document.head.appendChild(script)
    window.init = function (res) {
      console.log(113, res, window)
      resolve(window?.qq)
    }
    script.onerror = reject
  })
}

// 通过接口(腾讯)获取地理位置
export function getLocationIp() {
  console.log('getLocationIp')
  return new Promise((resolve, reject) => {
    let url = `http://apis.map.qq.com/ws/location/v1/ip?key=${QQ_MAP_KEY}`
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'json'
    xhr.onreadystatechange = function (res) {
      console.log(34, xhr)
      if (xhr.readyState === 4) {
        let data = res.response || {
          "ip": "110.185.17.102",
          "location": {
            "lat": 30.5702,
            "lng": 104.06476
          },
          "ad_info": {
            "nation": "中国",
            "province": "四川省",
            "city": "成都市",
            "district": "",
            "adcode": 510100,
            "nation_code": 156
          }
        }
        console.log(data)
        resolve(data)
      }
    }
    xhr.send()
  })
}
