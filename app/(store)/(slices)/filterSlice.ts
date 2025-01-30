import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterFields } from "../storeInterface";

const initialState: FilterFields = {
    date: "",
    product: "",
    platform: "",
    country: "",
    status: "",
    category: "",
};

const filterSlice = createSlice({
    name: "filterFields",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<any>) => {
            return action.payload;
        },
    },
});

export const { setFilters } = filterSlice.actions;

export default filterSlice.reducer;
