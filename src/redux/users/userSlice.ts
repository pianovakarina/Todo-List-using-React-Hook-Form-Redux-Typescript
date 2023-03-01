import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const usersLS = "usersLS";

export const getUsersFromLS = () => {
  const users: IUser[] = JSON.parse(localStorage.getItem(usersLS) || "[]");
  return users;
};

const setUsersToLS = (users: IUser[]) => {
  localStorage.setItem(usersLS, JSON.stringify(users));
};

export interface IUser {
  name: string;
  surname: string;
  login: string;
  password: string;
}
interface IUserStore {
  users: IUser[];
}
const initialState: IUserStore = {
  users: getUsersFromLS(),
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    saveNewUser: (state, action: PayloadAction<IUser>) => {
      const newUsers = [...state.users, action.payload];
      state.users = newUsers;
      setUsersToLS(newUsers);
    },
  },
});

export const { saveNewUser } = userSlice.actions;
export default userSlice.reducer;
