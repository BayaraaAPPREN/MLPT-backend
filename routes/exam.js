import express from "express";
import {getAllExam } from "../controllers/exam.js";

const router = express.Router();

router.get("/getAllExamList",getAllExam);

export default router