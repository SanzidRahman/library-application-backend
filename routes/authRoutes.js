import express from "express";
import { userLogin } from "../controller/authController.js";

const router = express.Router()

router.post("/register");
router.post("/login");
router.post("/logout");

export default router