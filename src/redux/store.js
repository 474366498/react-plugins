

import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./reducer/user";

import RouterReducer from "./reducer/router";

console.log(9, UserReducer, RouterReducer)
export default configureStore({
  reducer: {
    user: UserReducer,
    router: RouterReducer
  }
})