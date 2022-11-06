import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGeneralInfo } from '../../interfaces/generalInfo/generalInfo';

const initialState: IGeneralInfo = {
  pathname: '/'
};

export const generalInfoSlice = createSlice({
  name: 'generalInfo',
  initialState,
  reducers: {
    getPathname(state, action: PayloadAction<string>) {
      state.pathname = action.payload;
    }
  }
});

export default generalInfoSlice.reducer;
