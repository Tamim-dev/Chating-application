import { configureStore } from '@reduxjs/toolkit'
import userReducer from './components/slices/users/userSlice'

export default configureStore({
  reducer: {
    loggedUser : userReducer
  }
})