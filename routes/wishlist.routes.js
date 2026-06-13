import express from "express";

const router = express.Router();

router.get("/");

router.post("/add");

router.delete("/remove/:bookId");

export default router;