import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../common/api";
import { handleError,config } from "../../../common/configurations";
import { InstructorData } from "../../reducers/admin/adminSlice";

export const getAllInstructorApplication = createAsyncThunk<InstructorData,{ page:number, limit: number,status: string, search: string}>("admin/getinstructorreques",async({ page, limit, status, search},{rejectWithValue}) =>{
    try{    
        console.log("reached in the getallinstructor application thunk");
        const response = await axios.get(`${URL}/api/user/admin/instructor/applications?page=${page}&limit=${limit}&status=${status}&search=${search}`,config)
        console.log(response?.data,"aaaaaaaaaaaaaaaaaaaa");
        return response.data 
    }catch(error:any){
        console.error(error,"error in the getall instructor application")
        return handleError(error,rejectWithValue);
    }
})

export const approveInstructor = createAsyncThunk("/admin/instructorstatuschange",async(userData:any,{ rejectWithValue}) => {
    try{

        const response = await axios.post(`${URL}/api/user/admin/instructor/approval`,userData,config)
        console.log(response.data,"in the thunnk");
        return response.data
    }catch(error:any){
        console.error(error,"error in the approve instructor")
        return handleError(error,rejectWithValue)
    }   
})

// export const rejectInstructor = createAsyncThunk("/admin/rejectinstructor",async(userData:any,{rejectWithValue}) => {
//     try{
//         console.log("🚀 ~ rejectInstructor ~ userData:", userData)
//     }catch(error:any){  
//         console.error("error in the rejectInstructor",error);
//         return handleError(error,rejectWithValue)
//     }
// })