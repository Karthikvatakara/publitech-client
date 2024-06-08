import { createSlice } from "@reduxjs/toolkit";
import { signupUser,getUserData,loginUser,logout,applyToTeach } from "../../actions/user/userActions";


const initialState = {
    loading: false as boolean,
    user: null as any | null,
    error: null as any | null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // signupUser
            .addCase(signupUser.pending,(state) => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled,(state, { payload }) => {
                state.loading = false,
                state.user = payload.data;
                state.error = null
            }).addCase(signupUser.rejected,(state, { payload }) => {
                state.loading = false,
                state.user = null,
                state.error = payload
            })

            // getUserData
            .addCase(getUserData.pending,(state) => {
                state.loading = true;
            })
            .addCase(getUserData.fulfilled,(state,{payload}) => {
                state.loading = false;
                state.user = payload.data;
                state.error = null;
            })
            .addCase(getUserData.rejected,(state,{payload}) => {
                state.loading = false;
                state.user = null;
                state.error = payload;
            })

            //login
            .addCase(loginUser.pending,(state) =>{
                state.loading = true;
            })
            .addCase(loginUser.fulfilled,(state,{payload}) => {
                console.log("🚀 ~ .addCase ~ payload:", payload)
                state.loading = false;
                state.user = payload.data;
                state.error = null;
            })
            .addCase(loginUser.rejected,(state,{payload}) => {
                state.loading = false;
                state.user = null;
                state.error = payload
            })

            // logout
            .addCase(logout.pending,(state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled,(state) =>{
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected,(state,{payload})=> {
                state.loading = false;
                state.user = null;
                state.error = payload;
            })

            // instructor applicartion
            .addCase(applyToTeach.pending,(state)=>{
                state.loading =  true;
            })
            .addCase(applyToTeach.fulfilled,(state,{ payload }) => {
                state.loading = false;
                state.user = { ...state.user, ...payload };
                state.error = null
            })
            .addCase(applyToTeach.rejected,(state,{payload}) => {
                state.loading = false;
                state.error = payload
            })
    }
})

export default userSlice.reducer;