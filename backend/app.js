import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
const app = express();

app.use(cors());

dotenv.config({ path: "./.env" });
let PORT = process.env.PORT;

app.use(express.json());

app.use("/api", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
