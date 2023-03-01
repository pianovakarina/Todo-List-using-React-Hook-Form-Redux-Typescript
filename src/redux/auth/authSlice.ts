import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersFromLS, IUser } from "../users/userSlice";

// const authLS = "authLS";

// const getFromLS = () => {
//   const isAuth: boolean = JSON.parse(localStorage.getItem(authLS) || "false");
//   return isAuth;
// };

// const setToLS = (value: boolean) => {
//   localStorage.setItem(authLS, JSON.stringify(value));
// };

interface AuthState {
  isAuthorization: boolean;
  isAuthorizationError: string;
  currentUser: IUser;
}

const initialState: AuthState = {
  isAuthorization: false,
  isAuthorizationError: "",
  currentUser: {} as IUser,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ login: string; password: string }>
    ) => {
      const users = getUsersFromLS();

      const userLogin = users.find(
        (item) => item.login === action.payload.login
      );
      if (userLogin) {
        if (userLogin.password === action.payload.password) {
          state.isAuthorization = true;
          state.isAuthorizationError = "";
          state.currentUser = userLogin;
        } else {
          state.isAuthorizationError = "Write valid password";
        }
      } else {
        state.isAuthorizationError = "Write valid login ";
      }

      // if (
      //   action.payload.login === "karina" &&
      //   action.payload.password === "12345"
      // ) {
      //   state.isAuthorization = true;
      //   state.isAuthorizationError = "";
      //   setToLS(true);
      // } else {
      //   state.isAuthorizationError = "Write valid login and password";
      // }
    },
    logOut: (state) => {
      state.isAuthorization = false;
      // setToLS(false);
    },
  },
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
