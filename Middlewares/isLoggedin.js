const jwt=require('jsonwebtoken');
const isLoggedin = async (req,res,next)=>{
   
    if(!req.headers.authtoken){
        
        return res.status(400).json({status:false,data:"You are Not Loggedin"})
    }
    const authToken=req.headers.authtoken;
    const loggedUser = await jwt.verify(authToken,process.env.JWT_USER_LOGIN_SECRET_KEY);
    req.user=loggedUser;
    next();
}
module.exports=isLoggedin;