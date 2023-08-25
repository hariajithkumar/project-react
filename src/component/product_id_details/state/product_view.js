import { createSlice } from "@reduxjs/toolkit";


export const product_view = createSlice({
    name : "product_view",
    initialState: {
        product_id:""
    },
    reducers:{
        setproductId:(state,action)=>{
        state.product_id = action.payload
        }
    }
})

export const {setproductId} = product_view.actions
export default product_view.reducer
