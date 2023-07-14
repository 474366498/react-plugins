


// tabs 式导航 用于强制更新 
export function force(fn1, fn2, time = 20) {
  fn1 && fn1()
  setTimeout(() => {
    fn2 && fn2()
  }, time);
}