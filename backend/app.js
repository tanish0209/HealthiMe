import express from "express";
import cors from 'cors';
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";

//app config
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "https://healthime-admin.onrender.com",
  "https://healthime-frontend.onrender.com"
];
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//API Endpoint
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => console.log("Server started", PORT));
