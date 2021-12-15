// const JWT= require('jsonwebtoken');
const User = require('../models/nodemodels')


// exports.isAuth=async(req,res,next)=>{
    
//     const isValid= await verifyToken(req)
   

//     if(!isValid){
//         return res.status(401).json({success:false,error:'User not found, Authentication required!'})
//     }

//     req.user =isValid;
//     next();
// }

// const verifyToken =async(req)=>{
//     // const auth_token=req.body.auth_token||req.query.token||req.headers["x-access-token"]
//     if(!req.cookies.auth_token){
//         return false;
//     }

//     const decode = JWT.verify(req.cookies.auth_token,process.env.JWT_SECRET);
//     const user=await User.findOne({_id:decode._id})

//     if(!user){
//         return false;
//     }
//     return user;
// }

const jwt = require("jsonwebtoken");

// const config = process.env;

exports. verifyToken = async(req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const email=req.body.email;
    // console.log(req.body.email)
    // console.log(decoded)
    const user=await User.findOne({_id:decoded._id})
    // console.log(user)
    if(!user){
        return false;
    }
    next();
    // console.log(user)
    return user;
    
};
exports. profile =(req,res,next)=>{
  // try{
      const valid = jwt.verify(req.params.token , process.env.JWT_SECRET );


      if(valid){
          // console.log(req.cookies);
          req._id = valid._id;
          next();
          // res.send(valid);
      }else{
          res.send("access blocked")
      }
  // }catch{
  //     res.send({ message: "Invalid Token"});
  // }
}

// module.exports = verifyToken;