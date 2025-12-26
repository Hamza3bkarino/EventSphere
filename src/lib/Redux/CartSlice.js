import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name:'cart',
     initialState: {
        items: [],
        isOpen: false,
    },
    reducers:{
        AddToCart:(state,action)=>{
            console.log(action);
            
            const exist = state.items.find((e)=> e.id === action.payload.id)
            if(exist){
                exist.quantity +=1 ;
            }else{
                state.items.push({ ...action.payload, quantity: 1 })
            }
            state.isOpen = true; 
        },
        toggleCart: (state, action) => {
            state.isOpen = action.payload;
        },
    }
});
export const { AddToCart,toggleCart} = cartSlice.actions;
export default cartSlice.reducer;