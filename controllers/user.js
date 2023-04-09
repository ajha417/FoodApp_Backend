import { asyncError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
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

export const getAdminStats = asyncError(async(req,res,next)=>{
    const userscount = await User.countDocuments();
    const orders = await Order.find({});

    const preparingOrders = orders.filter(i=>i.orderStatus==="Preparing");
    const shippedOrders = orders.filter(i=>i.orderStatus==="Shipped");
    const deliveredOrders = orders.filter(i=>i.orderStatus==="Delivered");

    let totalIncome = 0;

    orders.forEach((i)=>{
        totalIncome += i.totalAmount
    });

    // if(!users) return next(new ErrorHandler("No users found"),401);

    res.status(200).json({
        success:true,
        userscount,
        ordersCount:{
            total : orders.length,
            preparing: preparingOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length
        },
        totalIncome,
    });
});