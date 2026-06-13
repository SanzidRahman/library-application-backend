import express from "express";
import { getMegaMenu } from "../controller/megaMenu.controller.js";


const router = express.Router();

router.get("/", getMegaMenu);



export default router;