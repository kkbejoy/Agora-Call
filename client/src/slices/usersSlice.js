import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersList } from "../api/userAPI";
const initialState = {
  usersList: [],
  isLoading: false,
  error: null,
};
const usersList = createSlice({
  name: "usersList",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserListAsync.fulfilled, (state, action) => {
        ((state.usersList = action.payload), (state.isLoading = false)),
          (state.error = null);
      })
      .addCase(getUserListAsync.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload.error || null);
      })
      .addCase(getUserListAsync.pending, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const getUserListAsync = createAsyncThunk("users/list", async () => {
  try {
    console.log("From user auth thunk");
    const usersList = await getUsersList();
    console.log("users list to redux", usersList);
    return usersList.users;
  } catch (error) {
    throw new Error(error);
  }
});
export const userListReducer = usersList.reducer;
