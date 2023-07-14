


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const counter = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state, action) => {
      console.log(13, action)
      state.value += (action.payload | 1)

    },
    decrement: (state, action) => {
      state.value -= (action.payload | 1)
    },
    doublement: state => {
      state.value *= 2
    }
  },
  extraReducers: builder => {
    console.log(25, builder)
  }

})
export const { increment, decrement, doublement } = counter.actions

export const asyncMent = (amount) => dispatch => {
  console.log(28, amount)
  let { fn, num } = amount
  setTimeout(() => {
    fn ? dispatch(increment(num)) : dispatch(decrement(num))
  }, 1e3);
}

export default counter.reducer



