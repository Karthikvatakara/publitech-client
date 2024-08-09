import { createSlice,SerializedError } from "@reduxjs/toolkit";
import { EnrollmentEntity } from "../../../interface/EnrollmentEntity";
import { isEnrollmentExist } from "../../actions/enrollment/enrollmentActions";
import { userEnrollments } from "../../actions/enrollment/enrollmentActions";


interface EnrollmentState {
    loading: boolean;
    enrollments: EnrollmentEntity[];
    enrollment: EnrollmentEntity | null;
    error: string | SerializedError | null;
}



const initialState: EnrollmentState = {
    loading: false,
    enrollments: [],
    enrollment: null,
    error: null
}

const enrollmentSlice = createSlice({
    name:"enrollments",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
       builder
            .addCase(isEnrollmentExist.pending,(state) => {
                state.loading = true
            })
            .addCase(isEnrollmentExist.fulfilled,(state,{ payload }) => {
                state.loading = false
                state.enrollment = payload as EnrollmentEntity
                state.error = null
            })
            .addCase(isEnrollmentExist.rejected,(state,{ payload }) => {
                state.loading = false,
                state.error = payload as SerializedError
            })

            // userEnrollments
            .addCase(userEnrollments.pending,(state) => {
                state.loading = true;
            })
            .addCase(userEnrollments.fulfilled,(state,{payload}) => {
                state.loading = false;
                state.enrollments = payload.data
                state.error = null
            })
            .addCase(userEnrollments.rejected,(state,{ payload }) => {
                state.loading = false;
                state.error = payload as SerializedError
            })
    }
})

export default enrollmentSlice.reducer