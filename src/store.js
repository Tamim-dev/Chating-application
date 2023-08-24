import { configureStore } from '@reduxjs/toolkit'
import userReducer from './components/slices/users/userSlice'
import activeChatReducer from "./components/slices/activeChat/activeChatSlice"

export default configureStore({
  reducer: {
    loggedUser : userReducer,
    activeChat : activeChatReducer
  }
})