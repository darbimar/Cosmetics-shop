import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import bagSlice from './slices/bagSlice';
import productsSlice from './slices/productsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        bag: bagSlice,
        product: productsSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
