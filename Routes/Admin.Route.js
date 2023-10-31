import express from 'express';
import { signIn, signUp } from '../Controller/Admin.Controller.js';
const router=express.Router();
router.post('/signIn',signIn);
router.post("/signUp",signUp);
export default router;