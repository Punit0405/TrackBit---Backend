const express=require('express');
const router= express.Router();
const isLoggedin=require('../Middlewares/isLoggedin');
const HabitController = require("../Controllers/HabitController");

//Route for Adding Habbit
router.route("/addhabit").post(isLoggedin,HabitController.addHabit);

//Route for Fetching Habit
router.route("/fetchhabit").get(isLoggedin,HabitController.fetchHabits)

//Route for Updating Habit
router.route("/updateHabit/:id").put(isLoggedin,HabitController.updateHabit)

//Route for Deleting Habit
router.route("/deleteHabit/:id").delete(isLoggedin,HabitController.deleteHabit)






module.exports=router;