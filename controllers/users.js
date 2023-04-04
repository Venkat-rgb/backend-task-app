import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookie.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const getUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (username.trim() !== "" || email.trim() !== "" || password.trim() !== "") {
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return next(new ErrorHandler("User already exists!", 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    sendCookie(newUser, 201, `Welcome back ${newUser.username}!`, res);
  } else {
    return next(new ErrorHandler("Please enter all the fields!", 404));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email.trim() !== "" || password.trim() !== "") {
    const isUserExists = await User.findOne({ email });

    if (!isUserExists) {
      return next(
        new ErrorHandler("User Not Found! Please Register First!", 404)
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Passwords doesn't match!", 404));
    }

    sendCookie(
      isUserExists,
      200,
      `Welcome back ${isUserExists.username}!`,
      res
    );
  } else {
    return next(new ErrorHandler("Please enter all the fields!", 404));
  }
};

export const logoutUser = (req, res) => {
  return res
    .status(200)
    .clearCookie("token", {
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "User is successfully logged out!",
    });
};

export const findUser = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};
