import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js";

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;

connectDb();

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/api/users", userRoutes)
app.use("/api/products",productRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
