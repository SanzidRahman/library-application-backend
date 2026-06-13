import express from "express";

const router = express.Router();

router.get("/book/:bookId");

router.post("/");

router.put("/:id");

router.delete("/:id");

export default router;