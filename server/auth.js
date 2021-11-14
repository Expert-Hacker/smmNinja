const jwt= require('jsonwebtoken')
const User = require('./Scheema/userScheema');
let cookies=require('cookie-parser')

const authenticateUser=async (req,res,next)=>{
   try {
    //    console.log("first");
    //     let token=req.cookies.USER_AUTH_LOG;
    //     console.log("ciikie is");
    //     console.log(token);
    //     let ver_token= jwt.verify(token,process.env.SECRET_KEY);
    
       
    //     let userExist=await User.find({_id:ver_token._id, "tokens.token":token});
    //     // log(userExist)
    //     if(!userExist)
    //     {
    //         return res.status(400).send("user not found")
    //     }
    //     console.log(userExist)
    //     req.root_user=userExist
    //     next();
    console.log("indside auth.js");
    let token=req.cookies.USER_AUTH_LOG;
    console.log("token is : "+token)
    const verf_token=jwt.verify(token,process.env.SECRET_KEY);
    console.log(verf_token)
    const root_user=await User.find({_id:verf_token.id, "tokens.token":token})
    if(!root_user)
    {
       return res.status(400).send("user not found")
    }
    console.log("root user");
    console.log(root_user)
    req.root_user=root_user;
    next();
   } catch (error) {
         res.status(400).send("user not found try catch")
   }
}
module.exports=authenticateUser;