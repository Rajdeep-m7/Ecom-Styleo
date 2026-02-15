import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import products from "./data/product.js";


dotenv.config();

mongoose.connect(process.env.MONGOURL);

const seedData = async()=>{
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser= await User.create({
            name: "Rajdeep Majumdar",
            email:"amazumder781@gmail.com",
            password:"123456",
            role:"admin",
        });

        const userId = createdUser._id;

        const sampleProducts = products.map((product)=>{
            return {...product , user: userId}
        });

        await Product.insertMany(sampleProducts);

        console.log("product added successfully");
        

        } catch (error) {
        console.error(error);
        
    }
}

seedData();