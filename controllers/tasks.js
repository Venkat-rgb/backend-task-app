import { Task } from "../models/Task.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });

  return res.status(200).json({
    success: true,
    tasks,
  });
};

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  if (title.trim() !== "" && description.trim() !== "") {
    await Task.create({ title, description, user: req.user });
    return res.status(201).json({
      success: true,
      message: "Task created successfully!",
    });
  } else {
    return next(new ErrorHandler("Please enter all the fields!", 404));
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const result = await Task.findById(id);
  if (!result) {
    return next(new ErrorHandler("Invalid Id!", 404));
  }

  result.isCompleted = !result.isCompleted;
  await result.save();

  return res.status(200).json({
    success: true,
    message: "Task is Updated Successfully!",
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const result = await Task.findByIdAndDelete(id);
  if (!result) {
    return next(new ErrorHandler("Invalid Id!", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Task is deleted Successfully!",
  });
};
