import express from "express";
import {
  getUsers,
  registerUser,
  findUser,
  loginUser,
  logoutUser,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", isAuthenticated, getUsers);

router.get("/me", isAuthenticated, findUser);

router.get("/logout", logoutUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
