import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  role: { type: String, enum: ["User", "Admin", "Guest"], default: "User" },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
