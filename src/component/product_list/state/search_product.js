import { createSlice  } from "@reduxjs/toolkit";

export const search_product = createSlice({
    name : 'search_product',
    initialState : {
        search_list : ""
    },
    reducers : {
        setProductlist:(state,action)=>{
            state.search_list = action.payload
        }
    }
})

export const {setProductlist} = search_product.actions
export default search_product.reducer