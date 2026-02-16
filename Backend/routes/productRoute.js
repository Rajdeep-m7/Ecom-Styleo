import express from "express";
import {protect , admin} from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";

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

productRouter.get("/", async (req , res)=>{
  try {
    const {collection , size , color , gender , minPrice , maxPrice , sortBy , search , category , material , brand , limit } = req.query;

    let query={};

    if(collection && collection.toLocaleLowerCase() !== "all"){
      query.collections = collections;
    }
    if(category && category.toLocaleLowerCase() !== "all"){
      query.category = category;
    }
    if(material){
      query.material= {$in : material.split(",")};
    }
    if(brand){
      query.brand= {$in : brand.split(",")};
    }
    if(size){
      query.sizes = {$in : size.split(",")};
    }
    if(color){
      query.colors= {$in: [color]};
    }
    if(gender){
      query.gender= gender;
    }
    if(minPrice || maxPrice){
      query.price={};
      if(minPrice) query.price.$gte = Number(minPrice);
      if(maxPrice) query.price.$lte = Number(maxPrice);
    }

    if(search){
      query.$or=[
        { name: {$regex: search , $options : "i"}},
        {description: {$regex: search , $options : "i"}}
      ];
    }

    let sort={};
    if(sortBy){
      switch(sortBy){
        case "priceAsc":
          sort = {price:1};
          break;
        case "priceDesc":
          sort={price:-1};
          break;
        case "popularity":
          sort= {rating:-1};
          break;
        default:
          break;
      }
    }

    let products= await Product.find(query).sort(sort).limit(Number(limit)||0);
    res.json(products);

  } catch (error) {
    res.status(500).send(error.message)
  }
})

//bestseller highest rating products
productRouter.get("/best-seller", async (req,res)=>{
  try {
    const product = await Product.findOne().sort({rating:-1});
    if(product){
      res.status(201).json(product);
    }
    else{
      res.status(401).json({message:" best-seller product not found"});
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

productRouter.get("/new-arrivals",async(req,res)=>{
  try {
    const product = await Product.find().sort({createdAt:-1}).limit(8);
    if(product){
      res.status(201).json(product);
    }
    else{
      res.status(401).json({message:" best-seller product not found"});
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

productRouter.get("/:id", async(req, res)=>{
  try {
    const product = await Product.findById(req.params.id);
    if(product){
      res.status(201).json(product);
    }
    else{
      res.status(401).json({message:"Product not found"});
    }
    
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//get similer products
productRouter.get("/similer/:id",async(req , res)=>{
  try {
    const {id}= req.params;
    const product = await Product.findById(id);
    if(!product){
      res.status(401).json({message:"Product not found"});
    }
    const similerProducts = await Product.find({
      _id:{$ne : id},
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similerProducts);

  } catch (error) {
    res.status(500).send(error.message)
  }
})



export default productRouter;
