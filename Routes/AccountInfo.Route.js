import express from 'express';
import { entry, verifyTransactioId } from '../Controller/AccountInfo.Controller.js';
const router=express.Router();
router.post("/verifyTransactioId",verifyTransactioId)
router.post("/entry",entry);
export default router;