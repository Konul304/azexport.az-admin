import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterFields } from "../storeInterface";

const initialState: FilterFields = {
    fields: {
        startDate: null,
        endDate: null,
        company: "",
        product: "",
        productType: "",
        country: "",
        status: "",
        amount: ""
    },
};

const filterSlice = createSlice({
    name: "filterFields",
    initialState,
    reducers: {
        setField: (
            state,
            action: PayloadAction<{ key: keyof FilterFields; value: any }>
        ) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
    },
});

export const { setField } = filterSlice.actions;

export default filterSlice.reducer;
