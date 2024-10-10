import { createSlice,SerializedError } from "@reduxjs/toolkit";
import { CourseEntity } from "../../../interface/courseEntity";
import { publishCourse,getAllCourse,getSingleCourse,updateCourse,getAllInstructorCourse } from "../../actions/course/courseActons";
 
interface CourseState {
    loading: boolean;
    courses: CourseEntity[];
    course: any | null;
    error: string | SerializedError | null;
    totalPages: number;
    currentPage: number
  }
  
  const initialState: CourseState = {
    loading: false,
    courses: [],
    course: null,
    error: null,
    totalPages: 1,
    currentPage: 1
  };



const courseSlice = createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(publishCourse.pending,(state) => {
                state.loading = true
            })
            .addCase(publishCourse.fulfilled,(state,{payload}) =>{
                state.loading = false,
                state.courses = payload as any,
                state.error = null
            })
            .addCase(publishCourse.rejected,(state,{payload}) => {
                state.loading = false,
                state.error = payload as SerializedError
            })
            .addCase(getAllCourse.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourse.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.courses = payload.data;
                state.error = null;
            })
            .addCase(getAllCourse.rejected,(state,{ payload }) => {
                state.loading = false;
                state.error = payload as SerializedError;
            })
            .addCase(getSingleCourse.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleCourse.fulfilled,(state,{ payload }) => {
                state.loading = false;
                state.course = payload;
                state.error = null;
            })
            .addCase(getSingleCourse.rejected,(state,{ payload }) => {
                state.loading = false;
                state.error = payload as SerializedError
            })
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(updateCourse.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.course = payload;
                state.error = null;
              })
              .addCase(updateCourse.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload as SerializedError;
              })
              .addCase( getAllInstructorCourse.pending, ( state ) => {
                state.loading = true,
                state.error = null;
              })
              .addCase( getAllInstructorCourse.fulfilled, ( state, { payload }) => {
                state.loading = false,
                state.courses = payload.data,                
                state.totalPages = payload.totalPages,
                state.currentPage = payload.currentPage,
                state.error = null;
              })
              .addCase( getAllInstructorCourse.rejected, ( state, { payload }) => {
                state.loading = false,
                state.error = payload as SerializedError
              })
    }
})

export default courseSlice.reducer