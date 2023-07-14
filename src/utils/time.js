// 格式化时间
var timeFormat = (time) => {
  let m = Math.floor(time / 60),
    s = Math.floor(time % 60)
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
},
  // 反向格式化时间
  formatTime = format => {
    let [m, s] = format.split(':')
    console.log(329, m, s, Number(m) * 60 + Number(s) * 1000)
    return Number(m) * 60 + Number(s)
  }
export {
  timeFormat,
  formatTime
}  