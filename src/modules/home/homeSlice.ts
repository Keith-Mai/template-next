import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type { User } from '@/api/auth/types';
import { __prod__ } from '@/lib/constants';
import type { RootState } from '@/store/index';

export interface HomeState {
  user: User | null;
}

const initialState: HomeState = {
  user: null,
};

const HOME_SLICE_NAME = 'home';

const homeSlice = createSlice({
  name: HOME_SLICE_NAME,
  initialState,
  reducers: {
    setUserProfile(state: HomeState, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const homeReducer = persistReducer(
  {
    debug: !__prod__,
    key: HOME_SLICE_NAME,
    keyPrefix: '',
    storage,
    whitelist: [''],
    serialize: true,
  },
  homeSlice.reducer
);

export const { setUserProfile } = homeSlice.actions;

export default homeSlice;

// SELECTOR
export const selectUserProfile = (state: RootState) => state.home.user;
