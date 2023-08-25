import { createSlice } from "@reduxjs/toolkit";

export const user_login = createSlice({
    name : "user_login",
    initialState : {
        login_details:{
            email : '',
            password : ''
        },
        logoutDetails:false
    },
    reducers : {
        setLoginDetails :(state,action)=>{
            state.login_details = action.payload
        },
        setLogoutDetails : (state,action)=>{
            state.logoutDetails = action.payload
        }
    }

})


export const {setLoginDetails,setLogoutDetails} = user_login.actions
export default user_login.reducer
