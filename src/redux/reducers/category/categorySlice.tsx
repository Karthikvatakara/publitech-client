import { createSlice } from "@reduxjs/toolkit";
import { CategoryEntity } from "../../../types/categoryEntity";
import { getActiveCategory } from "../../actions/category/categoryActions";

const initialState = {
    loading: false as boolean,
    availableCategory: [] as CategoryEntity | [],
    error: null as any | null
}

const categoriesSlice = createSlice({
    name:"categories",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(getActiveCategory.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getActiveCategory.fulfilled,( state, { payload }) => {
                state.loading = false;
                state.availableCategory = payload.data;
                state.error = null;
            })
            .addCase(getActiveCategory.rejected,( state,{ payload }) => {
                state.loading = false;
                state.error = payload
            })
    }
})

export default categoriesSlice.reducer