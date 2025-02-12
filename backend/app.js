import express from "express";
import cors from 'cors';
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

//app config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//API Endpoint
app.use('/api/admin', adminRouter);

app.get("/", (req, res) => {
    res.send("API working");
});

app.listen(PORT, () => console.log("Server started", PORT));