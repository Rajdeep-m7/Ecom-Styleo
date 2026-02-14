import React, { useState } from "react";

function EditProductPage() {
  const existingProduct = {
    name: "Jacket",
    description: "Winter warm jacket",
    price: 120,
    countInStock: 15,
    sku: "JKT123",
    category: "Clothing",
    brand: "Nike",
    sizes: ["M", "L"],
    colors: ["Black", "Blue"],
    material: "Cotton",
    gender: "men",
    images: [
      { url: "https://picsum.photos/200?random=1" },
      { url: "https://picsum.photos/200?random=2" },
    ],
  };

  const [productData, setProductData] = useState(existingProduct);
  const [newImages, setNewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const imagesPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages([...newImages, ...imagesPreview]);
  };

  const removeExistingImage = (index) => {
    const updated = [...productData.images];
    updated.splice(index, 1);
    setProductData({ ...productData, images: updated });
  };

  const removeNewImage = (index) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    setNewImages(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Product:", productData);
    console.log("New Images:", newImages);

    setProductData({
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

    setNewImages([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow rounded">
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
          label="Sizes (comma separated)"
          name="sizes"
          value={productData.sizes.join(",")}
          onChange={handleArrayChange}
        />

        <Input
          label="Colors (comma separated)"
          name="colors"
          value={productData.colors.join(",")}
          onChange={handleArrayChange}
        />

        <div>
          <label className="block text-sm font-semibold mb-1">Gender</label>
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

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold mb-2">Existing Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {productData.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.url}
                  alt="existing"
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold mb-2">Upload New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded bg-gray-50"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
            {newImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.preview}
                  alt="new"
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
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
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input type={type} {...props} className="w-full border p-2 rounded" />
    </div>
  );
}

export default EditProductPage;
