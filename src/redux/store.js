import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import bagSlice from './slices/bagSlice';
import productsSlice from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        bag: bagSlice,
        product: productsSlice
    },
})

