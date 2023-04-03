import jwt from "jsonwebtoken";

export const sendCookie = (user, statusCode, message, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
