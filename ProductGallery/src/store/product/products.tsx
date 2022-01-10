import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Product = {
  id?: string | null;
  title: string;
  description: string;
  launchDate: string;
  price: number;
  image?: any;
  isAvailable: boolean;
  needsUpdate?: boolean;
};

export interface ProductState {
  products: Array<Product>;
}

const initialState: ProductState = {
  products: [],
};

const reducers = {
  setProducts: (state: ProductState, { payload }: PayloadAction<Array<Product>>) => {
    state.products = payload;
  },
  addProducts: (state: ProductState, { payload }: PayloadAction<Array<Product>>) => {
    state.products = [...state.products, ...payload];
  },
  addUpdateProduct: (state: ProductState, { payload }: PayloadAction<Product>) => {
    const idx = state.products.findIndex((pr) => pr.id === payload.id);

    if (idx !== -1) {
      state.products[idx] = {
        ...state.products[idx],
        ...payload,
      };
    } else {
      state.products = [...state.products, { ...payload }];
    }
  },
};

const productsSlice = createSlice({ name: 'products', initialState, reducers });

export const { setProducts, addUpdateProduct, addProducts } = productsSlice.actions;
export const products = productsSlice.reducer;
