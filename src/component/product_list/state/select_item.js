import { createSlice  } from "@reduxjs/toolkit";

export const select_item = createSlice({
    name: 'select_item',
    initialState : {
        total_item : 0,
        additems : 0
    },
    reducers : {
        settotalitemDetails :(state,action) => {
            state.total_item = action.payload
        },
        setaddDetails :(state,action) => {
            state.additems = action.payload
        }
    }
})

export const {settotalitemDetails,setaddDetails}  = select_item.actions
export default select_item.reducer