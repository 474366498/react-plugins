
// https://segmentfault.com/a/1190000037571525
const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function (app) {
  app.use('/yy2', createProxyMiddleware({
    target: 'https://yy2.guiren21.com',
    changeOrigin: true
  }))
}

