import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/userSlice";

const store = configureStore({
  reducer: { auth: authReducer, usersStore: usersReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
