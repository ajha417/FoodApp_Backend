import app from "./app.js";
import {connectDB} from "./config/database.js"
connectDB();
app.get("/",(req,res,next)=>{
    res.send("<h1>Working fine</h1>")
})

app.listen(process.env.PORT,()=>{
    console.log(`server is listening on PORT ${process.env.PORT}`)
})