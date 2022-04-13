const mongoose = require('mongoose');
const {Schema,model}= require('mongoose');

const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    checkLists:{
        type:[String]
    },
    dueDate:{
        type:Date,
        required:true,
        
    },
    tags:{
       type:[String]
    },
    reminder:{
        type:Date,

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Todo = model("Todo",todoSchema);
module.exports= Todo;