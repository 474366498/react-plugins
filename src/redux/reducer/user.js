
// https://cloud.tencent.com/developer/beta/article/2246262?from=15425&areaSource=102001.3&traceId=PjBqG6I_7SoXOTc77TaT-

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const UserReducer = createSlice({
  name: 'user-store',
  initialState: {
    userInfo: null,
    sidebar: true
  },
  reducers: {
    login: (state, action) => {
      console.log(13, state.userInfo, action)
      state.userInfo = Object.assign({}, action.payload)
      console.log(state)
    },
    logout: (state, action) => {
      console.log(16, state, action)
    },
    updateSidebar: (state, action) => {
      console.log(state, action)
      state.sidebar = !state.sidebar
    }
  }
})

console.log(22, UserReducer)

export const { login, logout, updateSidebar } = UserReducer.actions

export const asyncLogin = loginInfo => dispatch => {
  console.log(29, loginInfo)
  setTimeout(() => {
    dispatch(login(loginInfo))
  }, 3000);
}

export default UserReducer.reducer

