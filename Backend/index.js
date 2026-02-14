import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();


const PORT = process.env.PORT;

connectDb();

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
