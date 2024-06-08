import { createAsyncThunk } from "@reduxjs/toolkit";   
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

//signup
export const signupUser = createAsyncThunk(
    "user/signupUser",
    async(userData:any,{ rejectWithValue }) =>{
    try{
        const response = await axios.post(`${URL}/api/auth/signup`,userData, 
            config
        );
        console.log(response.data ,"data reached heree");
        return response.data;
    }catch(error:any) {
        return handleError(error,rejectWithValue);
    }
})

//getUserData
export const getUserData = createAsyncThunk(
    "user/getUserData",
    async(_,{ rejectWithValue}) =>{
        try{
            const result = await axios.get(`${URL}/api/auth/`,config);
            console.log(result,"data reached in the getuserdata");
            return result.data;
        }catch(error:any) {
            console.error("error in the getuserData",error);
            return handleError(error,rejectWithValue)
        }
    }
)

// loginUser
export const loginUser = createAsyncThunk("user/login",async(userData:any,{rejectWithValue}) => {

    try{
        const { data } = await axios.post(`${URL}/api/auth/login`,userData,config);
        console.log(data,"data reached in the useractions");
        return data
    }catch(error:any){
        console.error("error in the loginUseractions",error)
        return handleError(error,rejectWithValue)
    }
})


// logout
export const logout = createAsyncThunk("user/logout",async(_,{rejectWithValue}) => {
    try{
        console.log("hi reached in the logout thunk");
        
        const response = await axios.delete(`${URL}/api/auth/logout`,config);
        return {status:response.status};
    }catch(error:any){
        console.error(error,"error in the logoutuseractions")
        return handleError(error,rejectWithValue);
    }
})

export const applyToTeach = createAsyncThunk("user/applyteach",async(userData:any,{rejectWithValue}) => {
    try{
        console.log("reached here",userData);
        const response = await axios.post(`${URL}/api/auth/apply-to-teach`,userData,config)
          console.log("🚀 ~ applyToTeach ~ response:", response)
          
        return response.data
    }catch(error:any){
        console.error(error,"error in the logoutuseractions")
        return handleError(error,rejectWithValue);
    }
})
