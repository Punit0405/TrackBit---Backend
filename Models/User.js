const {Schema,model}= require('mongoose');

const userSchema = new Schema({
     name:{
         type:String,
         required:true,
     },
     email:{
         type:String,
         required:true,
         unique:true

     },
     password:{
         type:String,
         required:true

     },
     badges:{
         type:[String]
     },
     experience:{
         type:Number,
         default:0
     },
     level:{
         type:Number,
         default:1
     },
     health:{
         type:Number,
         default:50
     },
     healthResetCount:{
         type:Number,
         default:0
     },
     idToken:{
         type:String
     },
     accessToken:{
         type: String
     },
     photoUrl:{
         type:String
     } 
});

const User=model("User",userSchema);

module.exports=User;