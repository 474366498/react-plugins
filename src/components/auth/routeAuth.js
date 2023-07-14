
import { Fragment } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
// import { userAuth } from './auth'
// console.log(4, userAuth)
const RouteAuth = ({ children }) => {
  const isLogin = useSelector(state => {
    return state.user.userInfo
  })
  console.log(9, isLogin)
  if (isLogin) {
    console.log('login')
    return <Navigate to='/login' />
  }
  return <Fragment>{children}</Fragment>
}

export default RouteAuth
