import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
    "checkout/createCheckout" , async(checkoutData , {rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, checkoutData,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);    
            return rejectWithValue(error.response.data)
        }
    }
)

const checkoutSlice = createSlice(
    {
        name: "checkout",
        initialState:{
            checkout: null,
            loading: null,
            error: null
        },
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(createCheckout.pending,(state)=>{
                state.loading= true;
                state.error = null;
            })
            builder.addCase(createCheckout.fulfilled,(state , action)=>{
                state.loading= false;
                state.checkout = action.payload;
            })
            builder.addCase(createCheckout.rejected,(state , action)=>{
                state.loading= false;
                state.error = action.payload;
            })
        }
    }
)

export default checkoutSlice.reducer;