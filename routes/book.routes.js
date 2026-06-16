import express from "express";
import { createBooks, getBook, getBooks } from "../controller/book.controller.js";
import { MulterUpload } from "../middleware/multer/multer.middleware.js";

const router = express.Router();

router.post("/", MulterUpload, createBooks);
router.get("/", getBooks);
router.get("/:id", getBook);

// router.get("/featured");
// router.get("/latest");

// router.get("/slug/:slug");



// router.put("/:id");

// router.delete("/:id");

export default router;