import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    'product/fetchProductsStatus',
    async (params) => {
        const { sort, categoryId, currentPage } = params;
        const res = await axios.get(
            `https://642abe2500dfa3b5474dceb5.mockapi.io/products?page=${currentPage}&limit=3&${categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sort.sortProperty}&order=${sort.order}`,
        );
        return res.data;
    }
)

const initialState = {
    items: [],
    status: 'loading'
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state,) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchProducts.rejected]: (state, action) => {
            state.items = [];
            state.status = 'error';
        }
    },
})

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;