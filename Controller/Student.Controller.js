import { request, response } from "express"
import { StudentPersonalInfo } from "../Model/StudentPersonalInfo.Model.js";
import { StudentFee } from "../Model/StudentFee.Model.js";
import { StudentAttendance } from "../Model/StudentAttendance.Model.js";
import { ClassFee } from "../Model/ClassFee.js";
import { resolve } from "path";
export const verifyStudent = async (request, response, next) => {
    try {
        let student = await StudentPersonalInfo.findOne({ aadharNumber: request.body.aadharNumber });
        console.log(student)
        return await student ? response.status(200).json({ result: "student is already register", status: true }) : response.status(400).json({ result: "student Not register", status: false })

    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }
}

export const registration = async (request, response, next) => {
    try {
        const student = await StudentPersonalInfo.findOne({ aadharNumber: request.body.aadharNumber });
        if (!student) {
            console.log(request.body.stdId)
            let registration = await StudentPersonalInfo.create({stdId:request.body.stdId,stdFname:request.body.stdFname,stdMothername:request.body.stdMothername,stdGender:request.body.stdGender,stdClass:request.body.stdClass,stdAddress:request.body.stdAddress,stdFee:request.body.stdFee,dob:request.body.dob,aadharNumber:request.body.aadharNumber,castNumberm:request.body.castNumberm,previousClass:request.body.previousClass,birthCertificate:request.body.birthCertificate,previousClassRollNumber:request.body.previousClassRollNumber,incomeProof:request.body.incomeProof});
            console.log(registration)
            if (registration) {
                await StudentFee.create({stdId:request.body.stdId,transactionId:request.body.transactionId,fee:request.body.fee}).then((result) => {
                    console.log(result);
                    return response.status(200).json({ status: true, message: "fee collected" })

                }).catch((err) => {
                    console.log(err);
                    return response.status(401).json({ status: false, message: "fee not  collected" })
                })
            }
            return response.status(200).json({ result: "Student is register succcess", status: true });

        } else {
            console.log("student already")
            return response.status(400).json({ result: "Student is already registered", status: false });
        }
    } catch (err) {
        console.log(err)
        return response.status(500).json({ err: "Internal server error", status: false });
    }
};
export const checkAlreadyTransactionId = async (request, response, next) => {
    try {
        console.log("check already transaction id api chali");
        let transactionId=request.body.transactionId;
        const already = await StudentFee.findOne({ transactionId });
        console.log(already)
        if (!already) {
            return response.status(200).json({ result: "Verified", status: true });
        } else {
            return response.status(401).json({ result: "available", status: false });
        }
    } catch (err) {
        console.error(err); // Log the error message
        return response.status(500).json({ error: "internal server error", status: false });
    }
};

export const feeCollection = async (request, response, next) => {
    try {
        console.log("fee collection api chli")
        const student = await StudentPersonalInfo.findOne({ stdId: request.body.stdId })
        console.log(request.body.stdId, +"  " + request.body.transactionId + "  " + request.body.fee)
        const transactionId = await StudentFee.find({ transactionId: request.body.transactionId })
        if (student)
            if (!transactionId) {
                const fee = StudentFee.create(request.body)
                if (fee)
                    return response.status(200).json({ status: true, message: "fee collected" })
                throw new err;
            }
            else {
                console.log("under else .....");
                return response.status(500).json({ message: "transaction id is unvalid", status: false })
            }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error", status: false });
    }
}



export const studentAttendance = async (request, response, next) => {
    console.log("Student Attendance...");
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
        console.log(response)
    }
    catch (err) {
        return response.status(500).json({ err: "student id is not valid" })

    }

}

export const fetchFee = async (request, response, next) => {
    console.log("controller")
    try {
        console.log(request.body.className)

        const classFee = await ClassFee.findOne({ className: request.body.className });
        console.log(classFee)
        if (classFee) {
            console.log(classFee.fee);
            return response.status(200).json({ result: classFee.fee });
        } else {
            return response.status(404).json({ error: "Class fee not found" });
        }
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "An error occurred" });
    }
};
