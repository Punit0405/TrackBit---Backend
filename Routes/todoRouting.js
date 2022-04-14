const express=require('express');
const router= express.Router();
const isLoggedin=require('../Middlewares/isLoggedin');
const TodoController = require("../Controllers/TodoController");
const validator = require("../Validations/todoValidator");

//Route for Adding Habbit
router.route("/addtodo").post(isLoggedin,validator.validateTodo,TodoController.addTodo);

//Route for Fetching todo
router.route("/fetchtodo").get(isLoggedin,TodoController.fetchTodos)

//Route for Updating todo
router.route("/updatetodo/:id").put(isLoggedin,validator.validateTodo,TodoController.updateTodo)

//Route for Deleting todo
router.route("/deletetodo/:id").delete(isLoggedin,TodoController.deleteTodo)






module.exports=router;