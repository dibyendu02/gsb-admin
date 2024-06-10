import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  isFetching: false,
  error: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    signupSuccess: (state) => {
      state.isFetching = false;
      state.isAuth = true;
      state.error = false;
    },
    signupFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    verificationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    verificationSuccess: (state, action) => {
      state.isFetching = false;
      state.isAuth = true;
      state.error = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    verificationFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  verificationStart,
  verificationSuccess,
  verificationFailure,
  logout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
