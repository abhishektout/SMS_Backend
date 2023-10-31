import { AccountInfo } from "../Model/SchoolAccountInfo.js";
export const verifyTransactioId =async (request, response, next) => {
    try {
        console.log("verify transaction id ");
        console.log(request.body.transactionId);
        let transaction =await AccountInfo.findOne({ transactionId: request.body.transactionId });
        console.log(transaction)
        if (transaction) {
            let payment =await transaction.payment;
            console.log(payment);
            return response.status(200).json({ result: payment, status: false });
        }
        else {
            console.log("invalid transaction id");
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
