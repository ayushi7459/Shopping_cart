import { createSlice } from "@reduxjs/toolkit";
import { MainState } from "../app/store";

export interface Card  {
    id:number;
    name:string;
    price:string;
    imageUrl:string;
    quantity:number
}

const initialState:{cards:Card[]} = {
    cards:[]
}

const cartItemSlice = createSlice({
    name : "cartItem",
    initialState,
    reducers:{
        AddCart: (state, action) => {
            const existing = state.cards.find(item => item.id === action.payload.id);
            if (existing) {
              existing.quantity += 1;
            } else {
              state.cards.push({ ...action.payload, quantity: 1 });
            }
          },
        RemoveCart:(state,action)=>{
           state.cards.splice(action.payload,1);
        },
        IncreaseQuantity: (state, action) => {
            const item = state.cards.find(i => i.id === action.payload);
            if (item) {
              item.quantity += 1;
            }
          },
          DecreaseQuantity: (state, action) => {
            const item = state.cards.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
            }
          },
    }
})

export const {AddCart,  RemoveCart,IncreaseQuantity, DecreaseQuantity} = cartItemSlice.actions;
export const cartItems = (state:MainState) => state.cartSlice.cards
export default cartItemSlice.reducer;