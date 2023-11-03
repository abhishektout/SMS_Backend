import express from "express";
import { registration,feeCollection, studentAttendance, verifyStudent, classFee, fetchFee, checkAlreadyTransactionId } from "../Controller/Student.Controller.js";
const router=express.Router();
router.post("/fee",feeCollection)
router.post("/verifyStudent",verifyStudent);
router.post("/registration",registration);
router.post("/studentAttendance",studentAttendance);
router.post("/classfee",classFee);
router.post("/fetchFee",fetchFee);
router.post("/checkAlreadyTransactionId",checkAlreadyTransactionId)
export default router;