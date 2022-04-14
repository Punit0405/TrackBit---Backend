const express=require('express');
const router= express.Router();
const isLoggedin=require('../Middlewares/isLoggedin');
const UserController=require('../Controllers/UserController');
const validator= require('../Validations/userValidator');

//Route for User Registration
router.route("/userregister").post(validator.validateUser,UserController.userRegister);

//Route for Email Verficaiton
router.route("/verifyuser/:token").get(UserController.verifyUser);

//Route for User Login Through Email And Password
router.route("/userlogin").post(UserController.userLogin);

//Route for User Login With google
router.route("/usergooglelogin").post(UserController.userGoogleLogin);

//Route for User Logout
router.route("/usergooglelogout").get(isLoggedin,UserController.userGoogleLogout);

// Route For Increasing User Experience
router.route("/increaseUserExperience").post(isLoggedin,UserController.increaseExperience)

//Route For Decreasing User Health
router.route("/decreaseUserHealth").post(isLoggedin,UserController.decreaseHealth)




module.exports=router;