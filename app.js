import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import { connectPassport } from './utils/Provider.js'
import session from "express-session"
import passport from "passport"
import cookieParser from "cookie-parser"

const app = express();
dotenv.config({
    path:"./config/config.env"
})



app.use(cookieParser());
// using middlewares
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))


app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())

connectPassport();

app.use("/api/v1",userRoutes);


export default app;