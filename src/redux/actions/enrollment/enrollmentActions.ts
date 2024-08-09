import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../common/api";
import { config, handleError } from "../../../common/configurations";


interface EnrollmentCheckArgs {
    courseId: string;
    userId: string;
}

export const isEnrollmentExist = createAsyncThunk("/course/enrollment",async(data: EnrollmentCheckArgs, { rejectWithValue }) => {
    try{
        console.log("🚀 ~ isEnrollmentExist ~ data:", data)
        const response = await axios.post(`${URL}/api/course/isEnrollmentExist`,data,config)

        console.log("🚀 ~ isEnrollmentExist ~ response:", response)
        return response.data
    }catch(error){
        return handleError(error as Error,rejectWithValue)
    }
})

export const userEnrollments = createAsyncThunk("/enrollment/mycourses",async(_, { rejectWithValue }) => {
    try{    
        const response = await axios.get(`${URL}/api/course/enrollment/mycourses`,config);
        
        console.log("🚀 ~ userEnrollments ~ response:", response.data)

        return response.data;

    }catch(error){
        return handleError(error as Error,rejectWithValue)
    }
})      