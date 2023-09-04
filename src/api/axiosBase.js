/* eslint-disable no-unused-expressions */



import axios from 'axios'

const AX = axios.create({
  baseURL: `http://192.168.2.100:5222`,
  timeout: 12e4
})

AX.interceptors.request.use(config => {
  config => {
    config.headers = {
      Accept: 'application/json,text/plain, */*'
    }
  }
  // console.log(17, config)
  return config
}, error => {
  // console.log(20, error)
  Promise.reject(error)
})


AX.interceptors.response.use(response => {
  // console.log(27, response)
  let { status } = response
  switch (status) {
    case 200:
      return response.data
    default:
      break;
  }
  return response
}, error => {
  console.log(error)
  Promise.reject(error)
})

export default AX