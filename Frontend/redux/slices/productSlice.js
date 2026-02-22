import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`,
    );
    return response.data;
  },
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
    );
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProducts",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    }
  );
    return response.data;
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({id}) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`,
    );

    return response.data;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      category: "",
      material: "",
      brand: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        material: "",
        brand: "",
      };
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchProductsByFilters.pending,(state)=>{
        state.loading= true;
        state.error = null;
    })
    builder.addCase(fetchProductsByFilters.fulfilled,(state , action)=>{
        state.loading= false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
    })
    builder.addCase(fetchProductsByFilters.rejected,(state)=>{
        state.loading= false;
        state.error = action.error.message;
    })

    builder.addCase(fetchProductDetails.pending,(state)=>{
        state.loading= true;
        state.error = null;
    })
    builder.addCase(fetchProductDetails.fulfilled,(state , action)=>{
        state.loading= false;
        state.selectedProduct = action.payload;
    })
    builder.addCase(fetchProductDetails.rejected,(state,action)=>{
        state.loading= false;
        state.error = action.error.message;
    })

    builder.addCase(updateProduct.pending,(state)=>{
        state.loading= true;
        state.error = null;
    })
    builder.addCase(updateProduct.fulfilled,(state , action)=>{
        state.loading= false;
        const updateProduct = action.payload;
        const index= state.products.findIndex(
            (product)=> product.id === updateProduct._id
        );
        if(index !== -1){
            state.products[index]= updateProduct;
        }
    })
    builder.addCase(updateProduct.rejected,(state)=>{
        state.loading= false;
        state.error = action.error.message;
    })

    builder.addCase(fetchSimilarProducts.pending,(state)=>{
        state.loading= true;
        state.error = null;
    })
    builder.addCase(fetchSimilarProducts.fulfilled,(state , action)=>{
        state.loading= false;
        state.similarProducts = action.payload;
    })
    builder.addCase(fetchSimilarProducts.rejected,(state,action)=>{
        state.loading= false;
        state.error = action.error.message;
    })
  }
});

export const {setFilters , clearFilters} = productSlice.actions;
export default productSlice.reducer;