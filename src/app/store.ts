import { configureStore } from "@reduxjs/toolkit";
import cartItemSlice from "../features/cartSlice";

export const store = configureStore({
    reducer:{
        cartSlice:cartItemSlice,
    },
})


export type MainState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
