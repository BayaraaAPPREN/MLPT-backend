import express from "express";
const app = express();
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import examRoutes from "./routes/exam.js";
import adminRoutes from "./routes/admin.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//MIdlleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin:"https://mlpt.vercel.app",
  })
);
app.use(cookieParser());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("API working");
});
