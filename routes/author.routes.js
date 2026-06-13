import express from "express";
import { createAuthors, getAuthors } from "../controller/authors.controller.js";

const router = express.Router();

router.get("/", getAuthors);
router.post("/", createAuthors);

// router.get("/:id");


// router.put("/:id");

// router.delete("/:id");

export default router;