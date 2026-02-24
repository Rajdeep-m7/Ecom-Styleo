import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchProductDetails } from "../../../redux/slices/productSlice";
import { updateProduct } from "../../../redux/slices/adminProductSlice";

function EditProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    material: "",
    gender: "",
    images: [],
  });

  const [newImages, setNewImages] = useState([]);

  /* Fetch Product */
  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  /* Prefill Form */
  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  /* Input Change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value,
    });
  };

  /* Array Inputs */
  const handleArrayChange = (e) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value.split(",").map((i) => i.trim()),
    });
  };

  /* Upload Image Preview */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages([...newImages, ...previews]);
  };

  /* Remove Existing Image */
  const removeExistingImage = (index) => {
    const updated = [...productData.images];

    updated.splice(index, 1);

    setProductData({
      ...productData,
      images: updated,
    });
  };

  /* Remove New Image */
  const removeNewImage = (index) => {
    const updated = [...newImages];

    updated.splice(index, 1);

    setNewImages(updated);
  };

  /* Upload to Cloudinary */
  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
      formData,
    );

    return res.data.imageUrl;
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* Upload New Images (Fast Parallel Upload) */

      const uploadedUrls = await Promise.all(
        newImages.map((img) => uploadImage(img.file)),
      );

      const newImageObjects = uploadedUrls.map((url) => ({
        url: url,
      }));

      /* Final Product */

      const finalProduct = {
        ...productData,
        images: [...productData.images, ...newImageObjects],
      };

      /* Update Product */

      await dispatch(
        updateProduct({
          id,
          productData: finalProduct,
        }),
      );

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Error updating product");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Input
          label="Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
        />

        <Input
          label="SKU"
          name="sku"
          value={productData.sku}
          onChange={handleChange}
        />

        <Input
          label="Price"
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />

        <Input
          label="Stock"
          type="number"
          name="countInStock"
          value={productData.countInStock}
          onChange={handleChange}
        />

        <Input
          label="Brand"
          name="brand"
          value={productData.brand}
          onChange={handleChange}
        />

        <Input
          label="Category"
          name="category"
          value={productData.category}
          onChange={handleChange}
        />

        <Input
          label="Material"
          name="material"
          value={productData.material}
          onChange={handleChange}
        />

        <Input
          label="Sizes (comma separated)"
          name="sizes"
          value={productData.sizes?.join(",")}
          onChange={handleArrayChange}
        />

        <Input
          label="Colors (comma separated)"
          name="colors"
          value={productData.colors?.join(",")}
          onChange={handleArrayChange}
        />

        {/* Gender */}

        <div>
          <label className="font-semibold mb-1 block">Gender</label>

          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>

            <option value="men">Men</option>

            <option value="women">Women</option>

            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Description */}

        <div className="sm:col-span-2">
          <label className="font-semibold mb-1 block">Description</label>

          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Existing Images */}

        <div className="sm:col-span-2">
          <label className="font-semibold">Existing Images</label>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-3">
            {productData.images?.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-24 object-cover border rounded"
                />

                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Images */}

        <div className="sm:col-span-2">
          <label className="font-semibold">Upload Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded mt-2"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
            {newImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.preview}
                  alt=""
                  className="w-full h-24 object-cover border rounded"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="font-semibold mb-1 block">{label}</label>

      <input type={type} {...props} className="w-full border p-2 rounded" />
    </div>
  );
}

export default EditProductPage;
