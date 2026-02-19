import express from "express";
import User from "../models/User.js";
import { protect , admin } from "../middleware/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/", protect, admin , async( req , res)=>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

adminRouter.post("/", protect , admin , async(req, res)=>{
    const { name , email , password , role}= req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "user already exists"});
        }
        user = new User({
            name ,
            email,
            password,
            role: role || "customer",
        });
        await user.save();
        res.status(201).json({message: "user created successfully"})
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

adminRouter.put("/:id",protect , admin , async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            user.name= req.body.name || user.name;
            user.email= req.body.email || user.email;
            user.role= req.body.role || user.role;
        }
        const updateduser = await user.save();
        res.json({message: "user updated succesfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

adminRouter.delete("/:id", protect , admin , async(req , res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message : "user not found"});
        }else{
            await user.deleteOne();
            res.json({message:"user deleted succesfully"})
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

export default adminRouter;