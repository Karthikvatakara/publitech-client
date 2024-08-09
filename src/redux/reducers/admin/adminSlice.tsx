import { PayloadAction, createSlice,SerializedError } from "@reduxjs/toolkit"
import { getAllInstructorApplication } from "../../actions/admin/adminActions"

export interface InstructorData {
    data: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

interface InstructorState {
    loading: boolean,
    instructors: any[],
    totalCount: number;
    totalPages: number;
    currentPage: number;
    error: string | SerializedError | null
}

const initialState: InstructorState = {
    loading: false,
    instructors: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    error: null
}

const instructorSlice = createSlice({
    name:"instructors",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(getAllInstructorApplication.pending,(state) => {
                state.loading = true;
            })
            .addCase(getAllInstructorApplication.fulfilled,(state,action:PayloadAction<InstructorData>) =>{
                console.log(action.payload,"payload inslice")
                state.loading = false;
                state.instructors = action.payload?.data;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                
                state.error = null;
            })
            .addCase(getAllInstructorApplication.rejected,(state,action) => {
                state.loading = false;
                state.error = action.payload as SerializedError
            })
    }
});

export default instructorSlice.reducer;

