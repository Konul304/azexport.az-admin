import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./(slices)/filterSlice";
import ordersSlice from "./(slices)/ordersSlice";
// import pageIndexSlice from "./(slices)/pageIndexSlice";
import paginationSlice from "./(slices)/paginationSlice";
import searchSlice from "./(slices)/searchSlice";

const store = configureStore({
    reducer: {
        search: searchSlice,
        pagination: paginationSlice,
        filterFields: filterSlice,
        orders: ordersSlice,
        // pageIndex: pageIndexSlice,
    },
});

export default store;
