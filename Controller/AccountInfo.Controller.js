import { AccountInfo } from "../Model/SchoolAccountInfo.js";
export const verifyTransactioId =async (request, response, next) => {
    try {
        let transaction =await AccountInfo.findOne({ transactionId: request.body.transactionId });
        if (transaction) {
            let payment =await transaction.payment;
            return response.status(200).json({ result: payment, status: false });
        }
        else {
            return response.status(401).json({ err: "transaction id is invalid", status: false });
        }
    }
    catch (err) {
        return response.status(500).json({ err: "internal server error", status: false });
    }
}
export const entry = (request,response,next)=>{
    AccountInfo.create(request.body)
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err);
    })
} 
