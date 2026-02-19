import express from "express";
import Product from "../models/Product.js";
import { protect , admin } from "../middleware/authMiddleware.js";

const adminProductRouter = express.Router();

adminProductRouter.get("/", protect , admin , async(req , res)=>{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

export default adminProductRouter;