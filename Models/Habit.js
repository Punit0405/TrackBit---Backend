const { default: mongoose } = require('mongoose');
const {Schema,model}= require('mongoose');

const habitSchema = new Schema({
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
    habitType:{
        type:Boolean,
        required:true
    },
    duration:{
        type:Number,
        required:true
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

const Habit = model("Habit",habitSchema);
module.exports= Habit;