import express from "express";
import { createBooks, getBook, getBooks } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBooks);

// router.get("/featured");
// router.get("/latest");

// router.get("/slug/:slug");



// router.put("/:id");

// router.delete("/:id");

export default router;