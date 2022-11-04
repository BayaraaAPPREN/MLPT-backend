import express from "express";
import { addExam } from "../controllers/admin.js"
// import {UpdateExam} from "../controllers/admin.js"

const router = express.Router();

router.post("/addExam", addExam);
// router.post("/updateExam", UpdateExam);

export default router
