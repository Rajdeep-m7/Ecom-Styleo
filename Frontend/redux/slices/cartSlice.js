import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadCartFromStorage = ()=>{
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {products: []};
};

const saveCartToStorage = (cart)=>{
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const fetchCart= createAsyncThunk(
    "cart/fetchCart" , async({userId , guestId} , {rejectWithvalue})=>{
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: { userId , guestId},
                }
            );
            return response.data;
        } catch (error) {
           return rejectWithvalue(error.response.data);
        }
    }
)

export const addToCart =  createAsyncThunk(
    "cart/addToCart",async({productId , quantity , size , color , guestId , userId } , {rejectWithvalue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                productId,
                quantity,
                size,
                color,
                guestId,
                userId,
            })
            return response.data;
        } catch (error) {
          return rejectWithvalue(error.response.data);  
        }
    }
)

export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity" ,async({productId , quantity , size , color , guestId , userId } , {rejectWithvalue})=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                productId,
                quantity,
                size,
                color,
                guestId,
                userId,
            })
            return response.data;
        } catch (error) {
            return rejectWithvalue(error.response.data); 
        }
    }
)

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart", async({productId , quantity , size , color , guestId , userId } , {rejectWithvalue})=>{
        try {
            const response = await axios({
                method:"DELETE",
                url:`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                data:{productId, quantity, size, color, guestId, userId,}
            })
            return response.data;
        } catch (error) {
            return rejectWithvalue(error.response.data); 
        }
    }
)

export const mergeCart = createAsyncThunk(
    "cart/mergeCart", async({guestId , user}, {rejectWithvalue})=>{
        try {
          const response=  await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge` ,{guestId , user},
            {
                headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            }
            }
          )
          return response.data;
        } catch (error) {
           return rejectWithvalue(error.response.data);  
        }
    }
)

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:loadCartFromStorage(),
        loading: false,
        error:null,
    },
    reducers:{
        clearCart:(state)=>{
            state.cart={products:[]};
            localStorage.removeItem("cart");
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCart.pending, (state)=>{
            state.loading= true;
            state.error= null;
        })
        builder.addCase(fetchCart.fulfilled, (state , action)=>{
            state.loading= false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        builder.addCase(fetchCart.rejected, (state , action)=>{
            state.loading= false;
            state.error= action.error.message;
        })

        builder.addCase(addToCart.pending, (state)=>{
            state.loading= true;
            state.error= null;
        })
        builder.addCase(addToCart.fulfilled, (state , action)=>{
            state.loading= false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        builder.addCase(addToCart.rejected, (state , action)=>{
            state.loading= false;
            state.error= action.error.message;
        })

        builder.addCase(updateCartItemQuantity.pending, (state)=>{
            state.loading= true;
            state.error= null;
        })
        builder.addCase(updateCartItemQuantity.fulfilled, (state , action)=>{
            state.loading= false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        builder.addCase(updateCartItemQuantity.rejected, (state , action)=>{
            state.loading= false;
            state.error= action.error.message;
        })

        builder.addCase(removeFromCart.pending, (state)=>{
            state.loading= true;
            state.error= null;
        })
        builder.addCase(removeFromCart.fulfilled, (state , action)=>{
            state.loading= false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        builder.addCase(removeFromCart.rejected, (state , action)=>{
            state.loading= false;
            state.error= action.error.message;
        })

        builder.addCase(mergeCart.pending, (state)=>{
            state.loading= true;
            state.error= null;
        })
        builder.addCase(mergeCart.fulfilled, (state , action)=>{
            state.loading= false;
            state.cart= action.payload;
            saveCartToStorage(action.payload);
        })
        builder.addCase(mergeCart.rejected, (state , action)=>{
            state.loading= false;
            state.error= action.error.message;
        })
    }
})

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;