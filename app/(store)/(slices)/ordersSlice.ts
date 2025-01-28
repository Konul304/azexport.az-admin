import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersState } from "../storeInterface";

const initialState: OrdersState[] = [
    {
        amount: '',
        buyer_email: '',
        buyer_platform: '',
        category: {
            id: null,
            name: '',
            created_at: '',
            updated_at: '',
        },
        category_id: null,
        country: '',
        created_at: '',
        date: '',
        id: null,
        note: '',
        product_name: '',
        status: null,
        subscriber: {
            id: null,
            name: '',
        },
        subscriber_id: null,
        updated_at: '',
        whatsapp_number: '',
    },
];

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrdersState[]>) => {
            return action.payload; 
        },
    },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
