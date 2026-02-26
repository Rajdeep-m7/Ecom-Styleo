import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import CheckOut from "../models/CheckOut.js";
import Order from "../models/Order.js"
import Cart from "../models/Cart.js"

const checkoutRouter = express.Router();

checkoutRouter.post("/",protect, async(req , res)=>{
    const {checkoutItems , shippingAddress , paymentMethod , totalPrice} = req.body;

    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({message:"No items in cart"})
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems : checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        res.status(201).json(newCheckout);
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
})

checkoutRouter.put("/:id/pay",protect , async(req , res)=>{
    const {paymentStatus , paymentDetails} = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({message:"Checkout not found"})
        }

        if(paymentStatus === "paid"){
            checkout.isPaid = true,
            checkout.paymentStatus = paymentStatus,
            checkout.paymentDetails= paymentDetails,
            checkout.paidAt= Date.now(),

            await checkout.save();

            res.status(200).json(checkout);
        }else{
            res.status(404).json({message:"Invalid payment status"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

checkoutRouter.post("/:id/finalize",protect , async(req , res)=>{
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({message:"Checkout not found"})
        }

        if(checkout.isPaid && !checkout.isFinalized){
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                paymentMethod: checkout.paymentMethod,
                shippingAddress: checkout.shippingAddress,
                totalPrice : checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDeliverd: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,

            });

            checkout.isFinalized= true;
            checkout.finalizedAt= Date.now();

            await checkout.save();

            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder)
        }else if(checkout.isFinalized){
            res.status(400).json({message:"checkout already finalized"});
        }else{
            res.status(400).json({message:"checkout is not paid"});
        }
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

export default checkoutRouter;