const express=require('express');
const router= express.Router();
const UserController=require('../Controllers/UserController');

//Route 1 : User Registration
router.route("/userregister").post(UserController.userRegister);
router.route("/verifyuser/:token").get(UserController.verifyUser);

module.exports=router;