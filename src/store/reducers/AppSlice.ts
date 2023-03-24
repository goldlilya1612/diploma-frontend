import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPopupInfo } from "../../interfaces/popup-info.interface";

export interface IAppState {
  isLoading: boolean;
  popupInfo: IPopupInfo;
}

interface IInitialAppState {
  app: IAppState;
}

const initialAppState: IInitialAppState = {
  app: {
    isLoading: false,
    popupInfo: {} as IPopupInfo,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.app.isLoading = action.payload;
    },
    setPopupInfo(state, action: PayloadAction<IPopupInfo>) {
      state.app.popupInfo = action.payload;
    },
  },
});
export default appSlice.reducer;
