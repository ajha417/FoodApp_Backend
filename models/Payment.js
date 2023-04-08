import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    razorpay_user_id:{
        type:String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

export const Payment = mongoose.model("Payment",Schema);