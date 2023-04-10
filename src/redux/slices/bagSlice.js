import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0
}

const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0)
        },
        removeItem(state, action) {
            state.items.filter(obj => obj.id !== action.payload);
        },
        clearItems(state) {
            state.items = []
        }
    }
})

export const { addItem, removeItem, clearItems } = bagSlice.actions;

export default bagSlice.reducer;