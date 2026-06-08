import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true
  })
);

app.use("/api",chatRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to DB");
  } catch (err) {
    console.log(err);
  }
};

const PORT = process.env.PORT || 6767;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

