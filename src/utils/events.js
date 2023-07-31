


export function debounce(fn, wait = 2e2, immediate = false) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait);
      if (callNow) {
        fn.apply(this, arguments)
      }
    } else {
      setTimeout(() => {
        console.log(18, new Date().getTime(), wait)
        fn.apply(this, arguments)
      }, wait);
    }
  }
}