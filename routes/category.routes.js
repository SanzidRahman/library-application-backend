import express from "express";
import { createCategory, getCategories } from "../controller/category.controller.js";

const router = express.Router();

// router.get("/:id");

router.get("/", getCategories);
router.post("/", createCategory);

// router.put("/:id");

// router.delete("/:id");

export default router;