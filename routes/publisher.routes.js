import express from "express";
import { createPublisher, getPublisher } from "../controller/publisher.controller.js";

const router = express.Router();




router.get("/", getPublisher);
router.post("/", createPublisher);

// router.get("/:id");
// router.put("/:id");
// router.delete("/:id");

export default router;