const mongoose = require('mongoose');
const {Schema,model}= require('mongoose');

const dailySchema = new Schema({
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

const Daily = model("Daily",dailySchema);
module.exports= Daily;