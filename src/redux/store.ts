import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userSlice"
import  adminReducer from "./reducers/admin/adminSlice"
import categoryReducer from "./reducers/category/categorySlice"
import courseReducer from "./reducers/course/courseSlice"
import enrollmentReducer from "./reducers/enrollment/enrollmentSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        instructors: adminReducer,
        category: categoryReducer,
        courses: courseReducer,
        enrollments : enrollmentReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppState = typeof store.dispatch;
