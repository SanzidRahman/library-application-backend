import express from "express";
import { searchBooks } from "../controller/searchBook.controller.js";

const router = express.Router();


router.get("/", searchBooks);




export default router;