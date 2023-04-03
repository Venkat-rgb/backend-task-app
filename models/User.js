import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
  },
});

export const User = mongoose.model("User", userSchema);
