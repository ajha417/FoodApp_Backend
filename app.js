import express, { urlencoded } from "express"
import dotenv from "dotenv"
import { connectPassport } from './utils/Provider.js'
import session from "express-session"
import passport from "passport"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/errorMiddleware.js"
import cors from "cors";

// importing routes
import userRoutes from "./routes/user.js"
import orderRoutes from "./routes/order.js"

const app = express();
dotenv.config({
    path:"./config/config.env"
})



app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
    extended:true
}));

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],

}))


// using middlewares
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:process.env.NODE_ENV === "development"?false:true,
        httpOnly:process.env.NODE_ENV === "development"?false:true,
        sameSite:process.env.NODE_ENV === "development"?false:"none"
    }
}))


app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

app.use("/api/v1",userRoutes);
app.use("/api/v1",orderRoutes);


export default app;

// using error middleware
app.use(errorMiddleware);