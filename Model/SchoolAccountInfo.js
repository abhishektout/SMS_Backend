import mongoose from "mongoose";

const AccountInfoSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
    },
    payment:{
        type:Number,
        require:true
    }
    
});

export const AccountInfo = mongoose.model('accountInfo', AccountInfoSchema);
