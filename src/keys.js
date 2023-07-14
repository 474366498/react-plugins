const BAIDU_MAP_KEY = `eYitAxjBztuzvI8ulZXg7mu6Ue7otzDb`
const QQ_MAP_KEY = `YPYBZ-6ABCX-M4F45-TAPDX-H2WGJ-LGFPB`
const GD_MAP_KEY = `c547a61734efb5510253ed339307e467`,
  GD_MAP_SAFETY_KEY = `2d5e56a96e0be147b23f634f19af2a2a`  // 安全密钥
/* 安全密钥 >> https://lbs.amap.com/api/javascript-api/guide/abc/prepare
以 Nginx 反向代理为例，参考以下三个location配置，进行反向代理设置，分别对应自定义地图、海外地图、Web服务，其中自定义地图和海外地图如果没有使用到相关功能也可以不设置。需要将以下配置中的“您的安全密钥”六个字替换为您刚刚获取的jscode安全密钥。如果您使用了多个key，需要在代理设置中根据 key来映射不同的安全密钥。
*/




export {
  BAIDU_MAP_KEY,
  QQ_MAP_KEY,
  GD_MAP_KEY,
  GD_MAP_SAFETY_KEY
}