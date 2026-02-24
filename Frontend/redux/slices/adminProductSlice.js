import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    return response.data;
  },
);

export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${API_URL}/api/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.post(
      `${API_URL}/api/admin/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProducts",
  async (id) => {
    {
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return id;
    }
  },
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === state.payload._id,
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload,
      );
    });
  },
});

export default adminProductSlice.reducer;