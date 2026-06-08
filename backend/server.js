import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", chatRoutes);

const PORT = process.env.PORT || 6767;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to DB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });