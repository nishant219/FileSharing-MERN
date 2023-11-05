import express from 'express';
const router = express.Router();
import upload from '../middlewares/upload.js';

import {uploadFile, downloadFile} from "../controllers/fileController.js";

router.route("/upload").post(upload.single('selectedFile'), uploadFile);
router.route("/result/:fileId").get(downloadFile);

export default router;

