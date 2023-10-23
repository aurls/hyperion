import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootState {}

const initialState: RootState = {};

const root = createSlice({
  name: 'root',
  initialState,
  reducers: {}
});

export default {
  ...root.actions,
  reducer: root.reducer
};
