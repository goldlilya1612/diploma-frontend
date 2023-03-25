import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPopupInfo } from "../../interfaces/popup-info.interface";
import { ICourseCardProps } from "../../interfaces/props/course-card.interface";

export interface IAppState {
  isLoading: boolean;
  popupInfo: IPopupInfo;
  courses: Array<ICourseCardProps> | null;
}

interface IInitialAppState {
  app: IAppState;
}

const initialAppState: IInitialAppState = {
  app: {
    isLoading: false,
    popupInfo: {} as IPopupInfo,
    courses: null,
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
    setCourses(state, action: PayloadAction<Array<any>>) {
      state.app.courses = action.payload;
    },
  },
});
export default appSlice.reducer;
