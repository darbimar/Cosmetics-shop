import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import bagSlice from './slices/bagSlice';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        bag: bagSlice
    },
})

