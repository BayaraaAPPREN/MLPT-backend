import express from 'express';
const app = express();  
import usersRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import examRoutes from "./routes/exam.js"


//MIdlleware
app.use(express.json())

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);

app.listen(3000,()=>{
    console.log("API working");
});