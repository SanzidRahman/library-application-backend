import express from "express";

const router = express.Router();

router.get("/");

router.post("/add");

router.put("/update/:itemId");

router.delete("/remove/:itemId");

router.delete("/clear");

export default router;