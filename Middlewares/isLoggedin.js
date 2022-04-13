const jwt=require('jsonwebtoken');
const isLoggedin = async (req,res,next)=>{
   
    if(!req.headers.authtoken){
        
        return res.status(400).json({status:false,data:"You are Not Loggedin"})
    }
    const authToken=req.headers.authtoken;
    try {
        const loggedUser = await jwt.verify(authToken,process.env.JWT_USER_LOGIN_SECRET_KEY);
         if(!loggedUser.id){
             return res.status(401).json({status:false,data:"Not a valid User"})
         }
        req.user=loggedUser;
        next();
    } catch (error) {
        
        return res.status(400).json({status:false,data:"Invalid Token"})
        
    }
    
}
module.exports=isLoggedin;