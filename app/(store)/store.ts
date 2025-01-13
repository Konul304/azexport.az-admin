import { configureStore } from "@reduxjs/toolkit";
// import callCountSlice from "./(slices)/callCountSlice";
import filterSlice from "./(slices)/filterSlice";
// import modalSlice from "./(slices)/modalSlice";
// import pageIndexSlice from "./(slices)/pageIndexSlice";
import paginationSlice from "./(slices)/paginationSlice";
import searchSlice from "./(slices)/searchSlice";

const store = configureStore({
    reducer: {
        // modal: modalSlice,
        search: searchSlice,
        pagination: paginationSlice,
        filterFields: filterSlice,
        // pageIndex: pageIndexSlice,
        // count: callCountSlice,
    },
});

export default store;
