const Todo=require("../Models/Todo")
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

class TodoController{

static addTodo =async(req,res)=>{    
    try {
        
        const {title,description,checklists,dueDate,tags,reminder} = req.body;
        const newTodo=new Todo({
            title:title,
            description:description,
            checkLists:checklists,
            userId:req.user.id,
            dueDate:dueDate,
            tags:tags
            
            

        })
        res.status(200).json({status:200,data:"Todo Added Sucessfully"})
        return await newTodo.save()
        
        
        
    } catch (error) {
        return res.status(500).json({status:false,data:"Some Internal Error Occured"})
    }
    

}
static fetchTodos =async (req,res)=>{
    try {
        const todos = await Todo.find({userId:req.user.id}).select("-userId");
        return res.status(200).json({status:true,data:todos})

        
    } catch (error) {
        return res.status(500).json({status:false,data:"Some Internal Server Occured"})
    }

}
static updateTodo = async(req,res)=>{
    try {
           const {id}= req.params;
           const {title,description,checklists,dueDate,tags,reminder} = req.body;
           const todo = await Todo.findById(id);
           if(!todo){
               return res.status(404).json({status:false,data:"Todo not found"})
           }
           
           if(todo.userId.toString()!==req.user.id){

             return res.status(400).json({status:false,data:"Todo doesn't Exists for this Account"})
           }
         

           if(title){
               todo.title =  title;
           }
           if(description){
               todo.description=description;
           }
           if(checklists){
               todo.checkLists=checklists
           }
           if(dueDate){
               todo.dueDate=dueDate
           }
           if(tags){
               todo.tags=tags

           }
           if(reminder){
               todo.reminder=reminder
           }
           await todo.save();
           return res.status(200).json({status:true,data:todo})

           
       } catch (error) {
        
           return res.status(500).json({status:false,data:"Some Internal Server Occured"})
       }
}
static deleteTodo = async(req,res)=>{
    try {
        const {id}=req.params;
        const todo= await Todo.findById(id);
        if(!todo){
            return res.status(404).json({status:false,data:"Todo Not Found"})
        }
        if(todo.userId.toString()!==req.user.id){
            return res.status(400).json({status:false,data:"Todo Doesn't Exists For this Account"})
        }
        await Todo.findByIdAndDelete(id)
        return res.status(200).json({status:true,data:todo});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:false,data:"Some Internal Error Occured"})
    }
}


}
module.exports = TodoController;