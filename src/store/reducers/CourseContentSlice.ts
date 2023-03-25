import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICourseContentState {
  content: any;
}

interface IInitialCourseContentState {
  courseContent: ICourseContentState;
}

const initialCourseContentState: IInitialCourseContentState = {
  courseContent: {
    content: [],
  },
};

export const courseContentSlice = createSlice({
  name: "courseContent",
  initialState: initialCourseContentState,
  reducers: {
    addChapter(
      state,
      action: PayloadAction<{
        name: string;
        id: string;
      }>
    ) {
      const newCourseContent = [...state.courseContent.content, action.payload];
      state.courseContent.content = newCourseContent;
    },
    removeChapter(state, action: PayloadAction<string>) {
      const newCourseContent = state.courseContent.content.filter(
        (item: any) => item.id !== action.payload
      );

      state.courseContent.content = newCourseContent;
    },
  },
});
export default courseContentSlice.reducer;
