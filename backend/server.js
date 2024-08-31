import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes); 


mongoose
  .connect("mongodb://localhost:27017/user-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
