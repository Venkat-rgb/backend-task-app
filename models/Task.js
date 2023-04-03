import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title!"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description!"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Task = mongoose.model("Task", taskSchema);
