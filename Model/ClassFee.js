import mongoose from "mongoose";

const classFeeSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    fee:{
        type:Number,
        require:true
    }
    
});

export const ClassFee = mongoose.model('classFee', classFeeSchema);
