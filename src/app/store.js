import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import dashboardReducer from "../store/dashboardSlice";
import projectReducer from "../store/projectSlice";
import estimatesReducer from "../store/estimateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    projects: projectReducer,
    estimates: estimatesReducer,
  },
});
