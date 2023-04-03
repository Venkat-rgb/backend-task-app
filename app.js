import express from "express";
import path from "path";
import { config } from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();
config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${path.resolve()}/public`));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONT_END_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(`Successfully connected to taskDB!`))
  .catch((err) => console.error(err));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(`Server is Unable to listen on port ${port}`);
    return;
  }
  console.log(
    `Server is up and running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});

app.use(errorMiddleware);
