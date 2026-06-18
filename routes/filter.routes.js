import express from "express";
import { getFilters } from "../controller/filter.controller.js";


const router = express.Router();

router.get("/", getFilters);


export default router;