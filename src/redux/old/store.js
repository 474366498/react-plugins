


import { configureStore } from "@reduxjs/toolkit";
import counter from "./counter";

console.log(7, counter)

export default configureStore({
  reducer: counter
})
