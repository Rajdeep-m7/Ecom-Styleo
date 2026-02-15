import jwt from "jsonwebtoken";
import User from '../models/User.js'

const protect = async(req , res , next)=>{
    let token ;

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    )
    try {
        token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token , process.env.JWT_SECRET);

        req.user = await User.findById(decode.user.id).select("-password"); //exclude password
        next();
    } catch (error) {
        console.error("token verfifcation failed");
        res.status(401).json({message:error.message})
    }
    else{
        res.staus(401).json({message:"not authorized , no token available"})
    }
}

export default protect;