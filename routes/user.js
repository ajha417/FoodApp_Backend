import express from 'express';
import passport from 'passport';
import { getAdminUsers, logout, myProfile } from '../controllers/user.js';
import { autherizeAdmin, isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

router.get("/authgoogle",passport.authenticate("google",{
    scope:["profile"],
}))

// router.get("/login",passport.authenticate("google",{
//     scope:["profile"],
//     successRedirect:process.env.FRONTEND_URL
// }))

router.get("/login",
passport.authenticate("google"),
(req,res,next)=>{

    res.send("Logged in");
    next();

})

router.get("/me",isAuthenticated,myProfile)
router.get("/logout",logout)


// Admin routes
router.get("/admin/users",isAuthenticated,autherizeAdmin,getAdminUsers);

export default router;