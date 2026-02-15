import express from "express";
import {protect , admin} from "../middleware/authMiddleware.js";
import Product from "../models/product.js";

const productRouter = express.Router();

productRouter.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Product add error" });
  }
});

productRouter.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
     res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      metaTitle,
      metaDescription,
      metaKeyword,
    } = req.body;

    // Update only if value is provided
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.countInStock = countInStock ?? product.countInStock;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.sizes = sizes ?? product.sizes;
    product.colors = colors ?? product.colors;
    product.collections = collections ?? product.collections;
    product.material = material ?? product.material;
    product.gender = gender ?? product.gender;
    product.images = images ?? product.images;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.tags = tags ?? product.tags;
    product.dimensions = dimensions ?? product.dimensions;
    product.weight = weight ?? product.weight;
    product.sku = sku ?? product.sku;
    product.metaTitle = metaTitle ?? product.metaTitle;
    product.metaDescription = metaDescription ?? product.metaDescription;
    product.metaKeyword = metaKeyword ?? product.metaKeyword;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.delete("/delete/:id", protect ,admin , async(req , res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
           return res.status(401).json({message:"Product not found"});
        }
        await product.deleteOne();
        res.status(201).json({message:"Product deleted successfully"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default productRouter;
