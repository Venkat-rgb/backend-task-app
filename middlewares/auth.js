import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler("User is not logged in! Please login first!", 404)
    );
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedToken._id);

  next();
};
