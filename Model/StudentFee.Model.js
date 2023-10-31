import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema({
    stdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentPersonalInfo',
        required: true,
    },
    fee:{
        type:String,
        require:true
    },
    transactionId:{
        type:String,
        require:true
    },
    paymentMode:{
        type:String,
        default:"online"
    }
});

export const StudentFee = mongoose.model('studentFee', studentFeeSchema);
