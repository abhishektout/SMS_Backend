import mongoose from "mongoose";

const studentAttendanceSchema= new mongoose.Schema({
    stdId: {
        type: String,
        required: true,
    },
    month :{
        type:String,
        required:true
    },
    presentDay:{
        type:Number,
        require:true
    },
    absentDay:{
        type:Number,
        require:true
    },
    totalDay:{
        type:Number,
        require:true
    }
});

export const StudentAttendance = mongoose.model('studentAttendance', studentAttendanceSchema);
