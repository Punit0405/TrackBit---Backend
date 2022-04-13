const express=require('express');
const router= express.Router();
const isLoggedin=require('../Middlewares/isLoggedin');
const DailyController = require("../Controllers/DailyController");

//Route for Adding Habbit
router.route("/adddaily").post(isLoggedin,DailyController.addDaily);

//Route for Fetching daily
router.route("/fetchdaily").get(isLoggedin,DailyController.fetchDailys)

//Route for Updating daily
router.route("/updatedaily/:id").put(isLoggedin,DailyController.updateDaily)

//Route for Deleting daily
router.route("/deletedaily/:id").delete(isLoggedin,DailyController.deleteDaily)






module.exports=router;