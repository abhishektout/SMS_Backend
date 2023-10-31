import mongoose from "mongoose";
const studentPersonalInfoSchema = new mongoose.Schema({
    stdId: {
        type: String,
        unique: true,
        null:false,
    },
    stdName: {
        type: String,
        required: true,
    },
    stdFname:{
        type:String,
        require:true
    },
    stdMothername:{
        type:String,
        require:true
    },
    stdGender: {
        type:String,
        require:true
    },
    stdClass:{
        type:String,
        require:true
    },
    stdAddress:{
        type:String,
        require:true
    },
    stdFee:{
        type:Number,
        require:true
    },
    dob: {
        type: String,
        required: true,
    },                                                                                                                                                 
    aadharNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    castNumber: {
        type: String,
        required: true,
        unique: true,
    },
    previousClass:String,
    birthCertificate: String,
    incomeProof: String,
    previousClassRollNumber: Number,
});

export const StudentPersonalInfo = mongoose.model('studentPersonalInfo', studentPersonalInfoSchema);
