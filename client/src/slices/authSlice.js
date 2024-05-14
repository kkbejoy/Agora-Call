import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isUserLoggedIn: false,
  userName: "",
  userToken: null,
  userId: null,
  isLoading: false,
  error: null,
};
const userLogIn = createSlice({
  name: "userLogin",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAsyncLogin.fulfilled, (state, action) => {
        (state.isUserLoggedIn = true),
          (state.userName = action.payload.userName),
          (state.userToken = action.payload.userToken);
        (state.userId = action.payload.userId),
          (state.isLoading = false),
          (state.error = null);
      })
      .addCase(userAsyncLogin.rejected, (state, action) => {
        (state.isUserLoggedIn = false),
          (state.userName = null),
          (state.userToken = null);
        (state.userId = null),
          (state.isLoading = false),
          (state.error = action.error || null);
      })
      .addCase(userAsyncLogin.pending, (state, action) => {
        (state.isUserLoggedIn = false),
          (state.userId = action.payload.userId),
          (state.isLoading = true),
          (state.error = null);
      });
  },
});

export const userAsyncLogin = createAsyncThunk("auth/user", async ({}) => {
  try {
    console.log("From user auth thunk");
  } catch (error) {
    throw new Error(error);
  }
});
export const userReducer = userLogIn.reducer;
