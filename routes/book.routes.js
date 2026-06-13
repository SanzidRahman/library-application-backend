import express from "express";
import { createBooks, getBooks } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBooks);

// router.get("/featured");
// router.get("/latest");

// router.get("/slug/:slug");

// router.get("/:id");


// router.put("/:id");

// router.delete("/:id");

export default router;