import { createAsyncThunk } from "@reduxjs/toolkit";   
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";
import { IUserLogin } from "../../../types/userLogin";

//signup
export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (userData: any, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${URL}/api/auth/signup`, userData, config);
        if (response?.data?.success) {
            console.log(response?.data?.data,"it is in the signupuser actions")
            if(response?.data?.data) {
                return response.data; 
            }
        } else {
          return rejectWithValue(response.data.message);
        }
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );

//getUserData
export const getUserData = createAsyncThunk(
    "user/getUserData",
    async(_,{ rejectWithValue}) =>{
        try{
            const result = await axios.get(`${URL}/api/auth/`,config);
            console.log(result,"data reached in the getuserdata");
            return result.data;
        }catch(error:any) {
            if (error.response && error.response.status === 401 && error.response.data.message === "Authentication required. no user provided") {
                // Return null to indicate no user is logged in
                return null;
            }
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


// applyto teach 
export const applyToTeach = createAsyncThunk("user/applyteach",async(userData:any,{rejectWithValue}) => {
    try{
        console.log("reached here",userData);
        const response = await axios.post(`${URL}/api/auth/apply-to-teach`,userData,config)
          console.log("🚀 ~ applyToTeach ~ response:", response)
          
        return response
    }catch(error:any){
        console.error(error,"error in the logoutuseractions")
        return handleError(error,rejectWithValue);
    }
})

// forgot password async thunk
export const forgotPassword = createAsyncThunk("forgot/password",async(email:string,{rejectWithValue}) =>{
    try{
        console.log(email);
        
        const response = await axios.post(`${URL}/api/auth/forgot-password`,{email},config)
        console.log("🚀 ~ forgotPassword ~ response:", response)
        return response.data
    }catch(error:any){
        console.error(error,"error in the forgotpassword async thunk")
        if (error.response && error.response.data && error.response.data.error) {
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue(error.response.data.message);
    }
})

// google auth
export const googleLoginSignup = createAsyncThunk("user/googleAuth",async(userCredentials:IUserLogin, { rejectWithValue }) => {
    try{
        console.log(userCredentials,"asdfasdfasfd");
        const response = await axios.post(`${URL}/api/auth/google`, { userCredentials } ,config)
        console.log("🚀 ~ googleLoginSignup ~ response:", response.data)
        return response.data    
    }catch(error:any){
        return rejectWithValue(error.response.data.message);
    }
})

export const editUserProfile = createAsyncThunk("user/editProfile",async(formData:FormData,{rejectWithValue}) => {
    try{
        const response = await axios.post(`${URL}/api/user/user/editUserProfile`, formData ,config)
        
        console.log("🚀 ~ editUserProfile ~ response:", response)
        return response.data;
    }catch(error){
        return rejectWithValue((error as Error)?.message)
    } 
    
})