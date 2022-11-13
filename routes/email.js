import express from "express";
import {SentEmail} from "../controllers/email.js";

const router = express.Router();

router.post("/news", SentEmail);

export default router
