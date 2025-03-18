import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: [],
  reducers: {
    addProfile: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addProfile } = profileSlice.actions;

export default profileSlice.reducer;