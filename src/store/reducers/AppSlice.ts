import { EUserRole } from "../../enums/user-role.enum";
import { IGroupRegister } from "../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  isLoading: boolean;
}

interface IInitialAppState {
  app: IAppState;
}

const initialAppState: IInitialAppState = {
  app: {
    isLoading: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.app.isLoading = action.payload;
    },
  },
});
export default appSlice.reducer;
