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
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.sizes === action.payload.sizes);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.sizes === action.payload.sizes);

            if (findItem) {
                findItem.count--;
            }
            state.items = state.items.filter((obj) => obj.count !== 0);
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
        },

        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload && obj.sizes !== action.payload.sizes);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0
        }
    }
})

export const selectBag = (state) => state.bag;
export const selectBagItemById = (id) => (state) => state.bag.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = bagSlice.actions;

export default bagSlice.reducer;