import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { config,handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";
import { CourseEntity } from "../../../interface/courseEntity";


export const publishCourse = createAsyncThunk("/instructor/createcours",async(data:CourseEntity,{ rejectWithValue }) => {
    try{
        console.log("🚀 ~ publishCourse ~ data:", data)
        const resonse = await axios.post(`${URL}/api/course/createcourse`,data,config);
        console.log("🚀 ~ createCategory ~ resonse:", resonse)
        return resonse.data
    }catch(error){
        return handleError(error as Error,rejectWithValue)
    }
})

export const getAllCourse = createAsyncThunk("/instructor/getAllCourse",async(_,{rejectWithValue}) => {
    try{
        console.log("aaaaaaaaaaaaaaaaaaaaa")
        const response = await axios.get(`${URL}/api/course/createcourse`,config)
        return response.data
        
    }catch(error){
        return handleError(error as Error,rejectWithValue)
    }
})



export const getSingleCourse = createAsyncThunk("/instructor/getSingleCourse",async(courseId:string,{ rejectWithValue }) => {
    try{
        console.log("🚀 ~ getSingleCourse ~ courseId:in thunk", courseId)
        
        const response = await axios.get(`${URL}/api/course/course/${courseId}`)
        
        console.log("🚀 ~ getSingleCourse ~ response:", response.data)
        return response.data
    }catch(error){
        return handleError(error as Error,rejectWithValue)
    }
})

export const getAllInstructorCourse = createAsyncThunk(
  "/instructor/getAllInstructorCourse",
  async (params: {
      page?: number;
      limit?: number;
      search?: string;
      stage?: string;
  }, { rejectWithValue }) => {
      try {
          const queryParams = new URLSearchParams({
              page: params.page?.toString() || '1',
              limit: params.limit?.toString() || '6',
              ...(params.search && { search: params.search }),
              ...(params.stage && { stage: params.stage }),
          });
          const response = await axios.get(`${URL}/api/course/getInstructorCourse?${queryParams}`, config);
          return response.data;
      } catch (error) {
          return handleError(error as Error, rejectWithValue);
      }
  }
);


export const updateCourse = createAsyncThunk(
    "/instructor/updatecourse",
    async (
      { courseId, updateData }: { courseId: string; updateData: CourseEntity },
      { rejectWithValue }
    ) => {
      try {
        console.log("🚀 ~ courseId:", courseId)
        
        const response = await axios.put(
          `${URL}/api/course/course/update/${courseId}`,
          updateData,
          config
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        return handleError(error as Error, rejectWithValue);
      }
    }
  );
