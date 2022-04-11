const express=require('express');
const router= express.Router();
const UserController=require('../Controllers/UserController');

//Route 1 : User Registration
router.route("/userregister").post(UserController.userRegister);

//Route 2 : Email Verficaiton
router.route("/verifyuser/:token").get(UserController.verifyUser);

//Route 3:User Login Through Email And Password
router.route("/userlogin").post(UserController.userLogin)



module.exports=router;