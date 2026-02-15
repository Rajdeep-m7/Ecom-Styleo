import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import protect from "../middleware/authMiddleware.js";


const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({email});

    if(user){
        return res.status(400).json({message:"User already exist"})
    }

    user = new User({name , email, password});
    await user.save();

    const payload = {user : {id : user._id , role : user.role}};

    jwt.sign(
        payload , process.env.JWT_SECRET,
        {
            expiresIn:"40h"
        },
        (err , token)=>{
            if(err) throw err;

            res.status(201).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            })
        }
    )
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Registration error" });
  }
});

userRouter.post("/login", async(req , res)=>{
    const { email , password } = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){ return res.status(400).json({message:"User not found"})};

        const isMatch = await user.matchPassword(password);
        if(!isMatch){ return res.status(400).json({message:"invalid credintials"})};

        const payload = {user : {id : user._id , role : user.role}};

    jwt.sign(
        payload , process.env.JWT_SECRET,
        {
            expiresIn:"40h"
        },
        (err , token)=>{
            if(err) throw err;

            res.json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            })
        }
    )
        
    } catch (error) {
       return res.status(500).json({message:error.message})
    }
})

userRouter.get("/profile", protect, async(req , res)=>{
    res.json(req.user);
})

export default userRouter;
