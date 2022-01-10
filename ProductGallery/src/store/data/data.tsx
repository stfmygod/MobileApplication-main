import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchForm } from 'pages/Home/Home';

export type DataState = {
  network: {
    status: boolean;
  };
  searchParams: {
    page: number;
    filterTitle: string;
    isAscending: boolean;
  };
};

const initialState: DataState = {
  network: {
    status: false,
  },
  searchParams: {
    page: 0,
    filterTitle: '',
    isAscending: true,
  },
};

const reducers = {
  setNetworkStatus: (state: DataState, { payload }: PayloadAction<boolean>) => {
    state.network.status = payload;
  },
  increaseSearchpage: (state: DataState) => {
    state.searchParams.page = state.searchParams.page + 1;
  },
  setSearchFilter: (state: DataState, { payload }: PayloadAction<SearchForm>) => {
    state.searchParams.filterTitle = payload.title;
    state.searchParams.isAscending = payload.isAscending;
    state.searchParams.page = 0;
  },
};

const dataSlice = createSlice({ name: 'data', initialState, reducers });

export const { setNetworkStatus, setSearchFilter, increaseSearchpage } = dataSlice.actions;
export const data = dataSlice.reducer;
