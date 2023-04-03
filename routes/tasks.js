import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isAuthenticated, getTasks);

router.post("/new", isAuthenticated, createTask);

router
  .route("/task/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
