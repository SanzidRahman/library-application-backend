import express from 'express'
import { getMedia, UploadMedia } from '../controller/upload.controller.js';
import { MulterUpload } from '../middleware/multer/multer.middleware.js';

const router = express.Router();




router.post("/upload", MulterUpload, UploadMedia);
router.get("/", getMedia);

export default router