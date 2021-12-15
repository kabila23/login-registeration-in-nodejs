const express=require('express');
const router=express.Router();
// const error=require('../controllers/error.controller');
const upload = require("../middlewares/upload");

const {signupUser,signinUser,signOut,getall,createstudent,token,link,reset,resend,verifyUser,iupload,profileupdate}=require('../controllers/nodecontroller')

const{userValidationResult,userValidator}=require('../validators/userValidator');
const {verifyToken,profile}= require('../middlewares/auth');
// const{imageupload}=require('../middlewares/upload');


 router.post('/signup',upload.single('profile'),userValidator,userValidationResult,signupUser);
 
router.post('/signin',signinUser);
router.get('/signin/:token',signinUser);
router.get('/out',signOut);
router.get('/gall',getall);
router.post('/cnew',createstudent)



 router.get('/findbytoken',verifyToken,token);
 router.post('/linksend',link);
 router.post('/password-reset/:userId/:token',reset);
 router.post('/resend',resend);
 router.put('/Registeration/:email',verifyUser)
 router.get('/Registeration/:encrypted',verifyUser)
 router.post('/update',upload.single('profile'),iupload)
//  router.post('/profileupdate/:token',upload.single('profile'),profileupdate)
 router.post('/profileupdate/:token',profile,profileupdate)
 
// router.get('/secret',isAuth,(req,res)=>{
//     console.log(req.user);
//     res.json({success:true, message:'you are inside our secret page!'});
// } )
// router.get('*',error.error);

module.exports=router;