const express=require('express');
const router= express.Router();
const isLoggedin=require('../Middlewares/isLoggedin');
const UserController=require('../Controllers/UserController');

//Route for User Registration
router.route("/userregister").post(UserController.userRegister);

//Route for Email Verficaiton
router.route("/verifyuser/:token").get(UserController.verifyUser);

//Route for User Login Through Email And Password
router.route("/userlogin").post(UserController.userLogin);

//Route for User Login With google
router.route("/usergooglelogin").post(UserController.userGoogleLogin);

//Route for User Logout
router.route("/usergooglelogout").get(isLoggedin,UserController.userGoogleLogout)



module.exports=router;