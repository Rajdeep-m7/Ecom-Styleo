import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addproduct() {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    discountPrice:"",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value.split(",").map((i) => i.trim()),
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages([...newImages, ...previews]);
  };
  const removeNewImage = (index) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
      formData,
    );

    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedUrls = await Promise.all(
        newImages.map((img) => uploadImage(img.file)),
      );

      const imageObjects = uploadedUrls.map((url) => ({
        url,
      }));

      const finalProduct = {
        ...productData,
        images: imageObjects,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        finalProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      alert("Product Added Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Input label="Name" name="name" onChange={handleChange} />

        <Input label="SKU" name="sku" onChange={handleChange} />

        <Input
          label="Price"
          type="number"
          name="price"
          onChange={handleChange}
        />

        <Input
          label="discountPrice"
          type="number"
          name="discountPrice"
          onChange={handleChange}
        />

        <Input
          label="Stock"
          type="number"
          name="countInStock"
          onChange={handleChange}
        />

        <Input label="Brand" name="brand" onChange={handleChange} />

        <Input label="Category" name="category" onChange={handleChange} />

        <Input label="Material" name="material" onChange={handleChange} />

        <Input
          label="Sizes (comma separated)"
          name="sizes"
          onChange={handleArrayChange}
        />

        <Input
          label="Colors (comma separated)"
          name="colors"
          onChange={handleArrayChange}
        />

        {/* Gender */}
        <div>
          <label className="font-semibold mb-1 block">Gender</label>
          <select
            name="gender"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="font-semibold mb-1 block">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          />
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
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

/* Reusable Input */
function Input({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="font-semibold mb-1 block">{label}</label>
      <input type={type} {...props} className="w-full border p-2 rounded" />
    </div>
  );
}

export default Addproduct;
