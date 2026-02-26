import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import checkoutRouter from "./routes/checkoutRoute.js";
import orderRouter from "./routes/orderRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import adminRouter from "./routes/adminRoute.js";
import adminProductRouter from "./routes/adminProductRoute.js";
import adminOrderRouter from "./routes/adminOrderRoute.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors({
  origin: [
    "https://styleo.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.options("*", cors());

app.use((req, res, next) => {

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://styleo.onrender.com"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Credentials",
    "true"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});


const PORT = process.env.PORT;

connectDb();

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/api/users", userRouter);
app.use("/api/products",productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders" , orderRouter);
app.use("/api/upload", uploadRouter);

//admin routes
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOrderRouter);

export default app;