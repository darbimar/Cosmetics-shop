import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: { name: 'популярности ↑', sortProperty: 'rating', order: 'asc' }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload;
            console.log(action.payload);
        },
        setSortType(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        }

    }
})

export const { setSearchValue, setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;