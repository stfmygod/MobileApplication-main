import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  email?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: '',
};

const reducers = {
  setAuthState: (state: AuthState, { payload }: PayloadAction<AuthState>) => {
    state.email = payload.email;
    state.isAuthenticated = payload.isAuthenticated;
  },
};

const userSlice = createSlice({ name: 'user', initialState, reducers });

export const { setAuthState } = userSlice.actions;
export const user = userSlice.reducer;
