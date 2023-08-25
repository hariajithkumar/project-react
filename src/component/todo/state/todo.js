import { createSlice } from "@reduxjs/toolkit";

export const todo = createSlice({
    name:'todo_list',
    initialState:{
        todo_list :{
            id: '',
            new_todo: ''
        },
        final_todo : []
    },
    reducers : {
        setTodoDetails:(state,action)=>{
            state.todo_list= action.payload
        },
        setfinaltodoDetails:(state,action)=>{
            state.final_todo = action.payload
        }
    }
})

export const { setTodoDetails,setfinaltodoDetails } = todo.actions
export default todo.reducer
