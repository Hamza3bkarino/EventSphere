import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cartItems");
const initialItems = savedCart ? JSON.parse(savedCart) : [];
const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");


const cartSlice = createSlice({
    name:'cart',
     initialState: {
        items: initialItems,
        isOpen: false,
        orders:storedOrders,
    },
    reducers:{ 
        AddToCart:(state,action)=>{
            
            const exist = state.items.find((e)=> e.id === action.payload.id)
            if(exist){
                exist.quantity +=1 ;
            }else{
                state.items.push({ ...action.payload, quantity: 1 })
            }
            state.isOpen = true; 

            localStorage.setItem("cartItems", JSON.stringify(state.items));

        },
        toggleCart: (state, action) => {
            state.isOpen = action.payload;
            localStorage.setItem("cartItems", JSON.stringify(state.items));

        },
        incrementQty: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
            localStorage.setItem("cartItems", JSON.stringify(state.items));

            },

        decrementQty: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
            localStorage.setItem("cartItems", JSON.stringify(state.items));

            },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.items));

            },
            clearCart: (state) => {
                state.items = [];
                localStorage.setItem("cartItems", JSON.stringify(state.items));
            },
        addOrder: (state, action) => {
                const newOrder = {
                    id: Date.now(),
                    ...action.payload,
                };
                state.orders.push(newOrder);
                console.log(state.orders);
                
                localStorage.setItem("orders", JSON.stringify(state.orders));
            },

    }
});

export const { AddToCart,toggleCart ,incrementQty, decrementQty , removeFromCart , clearCart , addOrder} = cartSlice.actions;
export default cartSlice.reducer;