import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type BagItem = {
    id: string, title:string, price: number, image: string, size: number, count: number
  }

interface BagSliceState {
    totalPrice: number;
    items: BagItem[]
}

const initialState:BagSliceState = {
    items: [],
    totalPrice: 0
}

const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        addItem(state, action:PayloadAction<BagItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
        },
        minusItem(state, action: PayloadAction<BagItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size);

            if (findItem) {
                findItem.count--;
            }
            state.items = state.items.filter((obj) => obj.count !== 0);
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },

        removeItem(state, action: PayloadAction<BagItem>) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id && obj.size !== action.payload.size);
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})

export const selectBag = (state: RootState) => state.bag;
export const selectBagItemById = (id:string) => (state: RootState) => state.bag.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = bagSlice.actions;

export default bagSlice.reducer;