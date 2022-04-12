const express=require('express');
const router= express.Router();
const isLoggedin=require('../Middlewares/isLoggedin');
const HabitController = require("../Controllers/HabitController");

router.route("/addhabit").post(isLoggedin,HabitController.addHabit)




module.exports=router;