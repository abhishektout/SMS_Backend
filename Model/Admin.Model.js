import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    schoolId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
export const Admin = mongoose.model('admin', adminSchema);
