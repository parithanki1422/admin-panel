import { createSlice } from "@reduxjs/toolkit";

const persistedUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  user: persistedUser || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action) {
      state.loading = false;
      state.error = null;
      state.user = action.payload; // for login or register
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { start, success, failure, logout } = authSlice.actions;
export default authSlice.reducer;
