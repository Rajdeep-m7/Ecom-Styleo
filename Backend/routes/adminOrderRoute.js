import express from "express";
import Order from "../models/order.js";
import { protect , admin } from "../middleware/authMiddleware.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get("/", protect , admin , async ( req , res)=>{
    try {
        const orders = await Order.find({}).populate("user" , "name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

adminOrderRouter.put("/:id", protect , admin , async ( req , res)=>{
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status=== "Delivered" ? true: order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedorder = await order.save();
            res.json(updatedorder);
        }else{
            res.status(404).json({message : "order not found"});
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

adminOrderRouter.delete("/:id", protect , admin , async ( req , res)=>{
    try {
            const order = await Order.findById(req.params.id);
            if(order){
                await order.deleteOne();
                res.json({meesage:  "order removed"})
            }else{
                res.status(404).json({message : "order not found"});
            }
        } catch (error) {
            res.status(500).json({message : error.message});
        }
})

export default adminOrderRouter;