import { asyncError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const myProfile = (req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user
    });
}

export const logout = (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) return next(err);
        res.clearCookie("connect.sid");
        res.status(200).json({
            message:"Logged out"
        })
    })
}
export const getAdminUsers = asyncError(async(req,res,next)=>{
    const users = await User.find({});
    // if(!users) return next(new ErrorHandler("No users found"),401);
    res.status(200).json({
        success:true,
        users
    })
})