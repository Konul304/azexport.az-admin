import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pagination } from "../storeInterface";

const initialState: Pagination = {
    paginationPageCount: 0,
    paginationState: {
        pageSize: 5,
        pageIndex: 0,
    },
    forcePageNum: false,
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPaginationPageCount: (state, action: PayloadAction<number>) => {
            state.paginationPageCount = action.payload;
        },
        setPaginationIndex: (
            state,
            action: PayloadAction<typeof state.paginationState.pageIndex>
        ) => {
            state.paginationState.pageIndex = action.payload;
        },
        setPaginationState: (
            state,
            action: PayloadAction<typeof state.paginationState>
        ) => {
            state.paginationState = action.payload;
        },
        setForcePageNum: (state, action: PayloadAction<boolean>) => {
            state.forcePageNum = action.payload;
        },
    },
});

export const {
    setPaginationPageCount,
    setPaginationIndex,
    setPaginationState,
    setForcePageNum,
} = paginationSlice.actions;

export default paginationSlice.reducer;
