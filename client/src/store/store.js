import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slices/authSlice";
import { userListReducer } from "../slices/usersSlice";
export const store = configureStore({
  reducer: { authSlice: userReducer, usersList: userListReducer },
});
