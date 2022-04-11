const User=require('../Models/User.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mailer=require('./Mailer')
class UserController{
 

   static userRegister= async(req,res)=>{
       try {
           const{name,email,password,confirmpassword}=req.body;
           if(!name){
               return res.status(400).json({status:false,data:"Name is not provided"})
           }
           if(!email){
               return res.status(400).json({status:false,data:"Email is not provided"})
           }
           if(!password){
               return res.status(400).json({status:false,data:"PassWord is not provided"})
           }
           if(!confirmpassword){
               return res.status(400).json({status:false,data:"Confirm Password is not provided"})
           }
           if(password!==confirmpassword){
               return res.status(401).json({status:false,data:"Password Doesn't Match"})
           }
           const user= await User.find({email:email});
               if(user.length!==0){
               return res.status(401).json({status:false,data:"User Already Exists"})
           }
           const salt= await bcrypt.genSalt(10)
           const hashPassword= await bcrypt.hash(password,salt);
            let newUser={
                name:name,
                email:email,
                password:hashPassword
            }            
            try {
                 
            let token = await jwt.sign(newUser,process.env.JWT_USER_REGISTER_SECRET_KEY,{expiresIn:"10m"})
             

             const mailOptions = {
             from: 'tewani0405@gmail.com',
             to: email,
             subject: 'TrackBit User Verification Email',
             html:`<h2>Click Here To Verify</h2> <br><a href="http://localhost:5000/api/v1/verifyuser/${token}">http://localhost:5000/api/v1/verifyuser/${token}</a><br><br><h1 style="text-align:center">Thanks From Registerting With Us !</h1><br>
             <h1 style="text-align:center">From,Track Bit</h1>`
             };
             mailer.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return res.status(501).json({success:false,data:"Internal Error Occured Please Try After Sometime"})
                } else {
                  console.log("success")
                  return res.status(200).json({success:true,data:"Please Verify Your Email To Login"})
                }
              });
             
             

            
            return res.status(200).json({status:true,data:token});
            } catch (error) {
                console.log(error.message);
                return res.status(501).json({succss:false,data:"Internal Server Error,Try After Some Time"})
            }
            

           
           
           
       } catch (error) {
           return res.status(500).json({status:false,data:"Some Internal Error Occured"})
       }
   } 


   static verifyUser =async(req,res)=>{
       try{
        const token=req.params.token;
    
        try {
            
            const payload= await jwt.verify(token,process.env.JWT_USER_REGISTER_SECRET_KEY);
            const user={
                name:payload.name,
                email:payload.email,
                password:payload.password
            }
            let databaseCheck =  await User.find({email:user.email});
           if(databaseCheck.length!==0){
            return res.status(401).json({status:false,data:"Email is Already Verified , Please Continue To Login"})
            

           }
        let verifiedUser=new User(user);
         await verifiedUser.save();
         return res.status(200).send("You Are Verified Please Continue to Login")
        } catch (error) {
            return res.status(400).json({status:false,data:"Link Expired ! Please Re-Register"})
        }
        
        
        
        
       }catch(error){
           console.log(error)
          return res.status(500).json({success:false,data:"Some Internal Error Occured"}) 
       }
       


   }


   static userLogin = async(req,res)=>{
       try {
           const {userEmail,userPassword}=req.body;
           if(!userEmail){
               return res.status(400).json({status:false,data:"Email ID is Not Provided"})
           }
           if(!userPassword){
               return res.status(400).json({status:false,data:"Password ID is Not Provided"})
           }
           const user= await User.findOne({email:userEmail});
           if(!user){
               return res.status(404).json({status:false,data:"Invalid Credentials"})
           }
            
             
           if(await bcrypt.compare(userPassword,user.password)){
               let loginData={
                   userId:user._id,
                   userEmail:user.email
               }
               let token= await jwt.sign(loginData,process.env.JWT_USER_LOGIN_SECRET_KEY);
               
               return res.status(200).cookie("auth-token",token).set("Auth-token",token).json({status:true,data:token})

           }else{
               return res.status(400).json({status:false,data:"Invalid Credentials"})
           }
           
           
       } catch (error) {
           return res.status(501).json({status:false,data:"Some Internal Error Occured"})
       }

   }
}

module.exports=UserController