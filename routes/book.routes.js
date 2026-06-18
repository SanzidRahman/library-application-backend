import express from "express";
import { createBooks, GetAllBooks, getBook } from "../controller/book.controller.js";
import { MulterUpload } from "../middleware/multer/multer.middleware.js";

const router = express.Router();

router.post("/", MulterUpload, createBooks);
router.get("/", GetAllBooks);
router.get("/:id", getBook);




export default router;