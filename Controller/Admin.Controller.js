import { request, response } from "express";
import { Admin } from "../Model/Admin.Model.js";

export const signIn = async (request, response, next) => {
   
    try {
        let admin = await Admin.findOne({ schoolId: request.body.schoolId });
        if (admin) {
            return request.body.password == admin.password ? response.status(200).json({ messages: "signIn successfully.....", status: true }) : response.status(400).json({ err: "invalid password", status: false });
        }
        return response.status(400).json({ result: "invalid school id", status: false })
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }
}

export const signUp = async (request, response, next) => {
    let res = await Admin.create({ schoolId: request.body.schoolId, password: request.body.password });
    console.log(res);
    console.log("admin signup...");
}