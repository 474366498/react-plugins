

import { useDispatch } from 'react-redux'
import { login, logout } from '../../redux/reducer/user'

let isLogin = false

const signIn = () => {
  isLogin = true
}

const signOut = () => {
  isLogin = false
}

export function userAuth() {
  return {
    isLogin,
    signIn,
    signOut
  }
}
