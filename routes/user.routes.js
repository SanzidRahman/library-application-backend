import express from "express";

const router = express.Router();

router.get("/");
router.get("/:id");

router.put("/:id");
router.delete("/:id");

export default router;