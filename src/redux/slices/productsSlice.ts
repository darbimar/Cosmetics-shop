import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { SortItem } from "../../components/Sort";

type FetchProducts = {
    sort: SortItem,
    categoryId: number,
    currentPage: number
};


export const fetchProducts = createAsyncThunk(
    'product/fetchProductsStatus',
    async (params: FetchProducts) => {
        const { sort, categoryId, currentPage } = params;
        const res = await axios.get(
            `https://642abe2500dfa3b5474dceb5.mockapi.io/products?page=${currentPage}&limit=6&${categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sort.sortProperty}&order=${sort.order}`,
        );
        return res.data as Product[];
    }
)

type Product = {
    id: string, title:string, price: number, image: string, sizes: number
}

interface ProductSliceState {
    items: Product[];
    status: string
}

const initialState: ProductSliceState = {
    items: [],
    status: 'loading'
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Product[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.items = [];
            state.status = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.items = [];
            state.status = 'error';
        })
    },
})

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;