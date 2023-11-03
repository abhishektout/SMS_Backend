import { request, response } from "express"
import { StudentPersonalInfo } from "../Model/StudentPersonalInfo.Model.js";
import { StudentFee } from "../Model/StudentFee.Model.js";
import { StudentAttendance } from "../Model/StudentAttendance.Model.js";
import { ClassFee } from "../Model/ClassFee.js";
import { resolve } from "path";
import { AccountInfo } from "../Model/SchoolAccountInfo.js";
import nodemailer from 'nodemailer';
export const verifyStudent = async (request, response, next) => {
    try {
        let student = await StudentPersonalInfo.findOne({ aadharNumber: request.body.aadharNumber });
        return await student ? response.status(200).json({ result: "student is already register", status: true }) : response.status(400).json({ result: "student Not register", status: false })
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }
}
export const registration = async (request, response, next) => {
    console.log("innner registration")
    try {
        const student = await StudentPersonalInfo.findOne({ aadharNumber: request.body.aadharNumber });
        if (!student) {
            const registration = await StudentPersonalInfo.create({ stdContact: request.body.stdContact, stdEmail: request.body.stdEmail, stdId: request.body.stdId, stdName: request.body.stdName, stdFname: request.body.stdFname, stdMothername: request.body.stdMothername, stdGender: request.body.stdGender, stdClass: request.body.stdClass, stdAddress: request.body.stdAddress, stdFee: request.body.stdFee, dob: request.body.dob, aadharNumber: request.body.aadharNumber, castNumber: request.body.castNumber, previousClass: request.body.previousClass, birthCertificate: request.body.birthCertificate, previousClassRollNumber: request.body.previousClassRollNumber, incomeProof: request.body.incomeProof });
            if (registration) {
                let Finalyregisteration= StudentFee.create({ stdId: request.body.stdId, transactionId: request.body.transactionId, fee: request.body.fee })
                if(Finalyregisteration){
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'abhishek.tout@gmail.com',
                            pass: 'borw dxnh fqhj ldfy'
                        }
                    });
                    var mailOptions = {
                        from: 'abhishek.tout@gmail.com',
                        to: request.body.stdEmail,
                        subject: 'Mount Carmal School Admission',
                        text: 'Dear student your your admission successfully' + "             your student id is:  " + request.body.stdId + "          student name is :" + request.body.stdName + "      student father name is : " + request.body.stdFname + "     class fee :   " + request.body.stdFee
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                           return response.status(200).json({ status: true, message: "Successfully send mail" });
                        }
                    });
                   return response.status(200).json({ status: true, message: "Successfully registration but email not sent" });
                } 
                else{
                    response.status(401).json({ status: false, message: "fee not collected" });
                }  
            }
        } else {
            response.status(400).json({ result: "Student is already registered", status: false });
        }
    } catch (err) {
        console.log(err);
        response.status(500).json({ err: "Internal server error", status: false });
    }
};
export const checkAlreadyTransactionId = async (request, response, next) => {
    try {
        let transactionId = request.body.transactionId;
        const already = await StudentFee.findOne({ transactionId });
        if (!already) {
            return response.status(200).json({ result: "Verified", status: true });
        } else {
            return response.status(401).json({ result: "available", status: false });
        }
    } catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
};
export const feeCollection = async (request, response, next) => {
    try {
        const student = await StudentPersonalInfo.findOne({ stdId: request.body.stdId });
        if (!student) {
            return response.status(404).json({ status: false, message: "Student not found" });
        }
        const transactionId = await StudentFee.findOne({ transactionId: request.body.transactionId });
        if (!transactionId) {
            let checkTransValid = await AccountInfo.findOne({ transactionId: request.body.transactionId })
            if (checkTransValid) {
                const fee = await StudentFee.create(request.body);
                return response.status(200).json({ status: true, message: "Fee collected" });
            }
            else {
                return response.status(410).json({ message: "Transaction id not valid", status: false })
            }
        } else {
            return response.status(400).json({ message: "Transaction ID already exists", status: false });
        }
    } catch (err) {
        return response.status(500).json({ err: "Internal server error", status: false });
    }
}
export const studentAttendance = async (request, response, next) => {
    let student = await StudentPersonalInfo.findOne({ stdId: request.body.stdId });
    if (student) {
        let attendance = await StudentAttendance.create(request.body);
        return response.status(200).json({ result: attendance, status: true });
    }
    else
        return response.status(500).json({ error: "attendance not found", status: false });
}
export const classFee = (request, response, next) => {
    try {
        let response = ClassFee.create(request.body);
    }
    catch (err) {
        return response.status(500).json({ err: "student id is not valid" })
    }
}
export const fetchFee = async (request, response, next) => {
    try {
        const classFee = await ClassFee.findOne({ className: request.body.className });
        if (classFee)
            return response.status(200).json({ result: classFee.fee });
        else
            return response.status(404).json({ error: "Class fee not found" });
    } catch (err) {
        return response.status(500).json({ error: "An error occurred" });
    }
};
