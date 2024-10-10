import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";
import { config,handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";


export const getActiveCategory = createAsyncThunk("/instructor/getactivecourse",async(_,{rejectWithValue}) => {
        try{
            console.log("ppppppppppppppppppppppppppppp");
            const result = await axios.get(`${URL}/api/course/category/available`,config);
            return result.data
        }catch(error){
            return handleError(error as Error,rejectWithValue)
        }
})

