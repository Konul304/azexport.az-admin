import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../storeInterface";

const initialState: SearchState = {
    searchValue: "",
    searchPlaceHolder: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setSearchPlaceHolder: (state, action: PayloadAction<string>) => {
            state.searchPlaceHolder = action.payload;
        },
    },
});

export const { setSearchValue, setSearchPlaceHolder } = searchSlice.actions;
export default searchSlice.reducer;
