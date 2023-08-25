import { createSlice  } from "@reduxjs/toolkit";

export const select_product = createSlice({
    name : 'select_product',
    initialState:{
        product_item : ''
    },
    reducers : {
        setproductitemDetails : (state,action) => {
            state.product_item = action.payload
        }
    }
})

export const { setproductitemDetails } = select_product.actions
export default select_product.reducer
