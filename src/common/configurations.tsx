
interface ApiResponseError extends Error {
    response?: {
        data?: {
            message?: string
        }
    }
}

export const config = {
    headers: {
        "content-Type": "application/json",
    },
    withCredentials: true,
}

export const handleError = (error: ApiResponseError, rejectWithValue: (value: string | unknown)=> void) => {

    if(error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
    }
    else if(error.message) {
        return rejectWithValue({ message: error.message})
        
    }
    else {
        return rejectWithValue({message:"an unknown error occured"});
    }
}