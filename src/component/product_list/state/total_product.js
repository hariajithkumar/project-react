import { createSlice } from "@reduxjs/toolkit";


export const total_product = createSlice({
    name : "total_product",
    initialState:{
        productDetails:""
    },
    reducers : {
        setproductDetails:(state,action)=>{
        state.productDetails = action.payload
        }
    }
}) 

export const {setproductDetails}  = total_product.actions
export default total_product.reducer