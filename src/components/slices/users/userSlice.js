import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loginUser: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state,actions) => {
      state.loginUser = actions.payload
    }
  }
})


export const {userData} = counterSlice.actions

export default counterSlice.reducer