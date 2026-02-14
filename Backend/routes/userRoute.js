import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


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

export default userRouter;
