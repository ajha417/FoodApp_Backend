 export const isAuthenticated = (req,res,next)=>{
    const token = req.cookies;
    console.log(token);
    next();
}