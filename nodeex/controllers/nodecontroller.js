const mod=require('../models/nodemodels')
const Token = require("../models/token");
const profile=require("../models/profile")

const JWT=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
const express=require('express-validator');
const path=require('path')

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const crypto = require ("crypto");

// const image=require("../models/image")
const sendEmail = require('../utils/sendEmails');
const {imageupload}=require('../middlewares/upload')


//Generating token
const signToken=(userId)=>{
    return JWT.sign({_id:userId},process.env.JWT_SECRET);
}

//Get all documents
exports. getall=async(req,res)=>{
    try{
        const all=await mod.find();
        res.status(200).json(all);
    }
    catch(error){
       res.status(404).json({message:error.message})
    }
}

//Create new user
exports. createstudent =  async (req, res) => {

    const newstudent = new mod({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
        date:req.body.date,
       

    })
    console.log(newstudent);
    try {
        await newstudent.save();
        const signToken=(userId)=>{
                return JWT.sign({_id:userId},process.env.JWT_SECRET);
            }

        res.status(201).json(newstudent);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

}

exports.signupUser= async(req,res)=>{
    // try{
        const email=req.body.email;
      
        const encryptedString = cryptr.encrypt(req.body.email);
    
    const user =await mod.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success:false,error:'This email is already in use, Try signin' });
    }
    else{
        const password=req.body.password;
        const conformpassword=req.body.conformpassword;
        
        if(password===conformpassword){
            var details=new mod({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                // email:encryptedString,
                password:req.body.password,
                role:req.body.role,
                // profile:req.file.filename,
                date:req.body.date,

            })
        }
        else{
            res.send("password and conform password does not match");
        }
        
         // const newUser =new mod(req.body);
        //  details.status="active";
    var newUser=await details.save();
    console.log(newUser);
    // const {firstname,lastname,email,role,date}=newUser;
    const {firstname,lastname,role,date}=newUser;
    // await newUser.save();
    const token= signToken(newUser._id);
    console.log(token);
        // res.cookie('auth_token',token,{
        //     httpOnly:true
        // });
        const email=encryptedString;
        console.log(encryptedString)
    //    const image1=process.env.BASE_URL+'profile/'+'_'+req.file.filename
         const link = process.env.BASE_URL+'Registeration/'+email;
         console.log(link)
        await sendEmail(newUser.email, "Registeration", link);
        // res.send("registeration link send successfully");
         res.status(201).json({success:true, newUser:{firstname,lastname,email,role,date} });
    }
// }
// catch(error)
// {
//     res.status(500).json({success:false, error:'Some error occurred'});
// }
}; 

exports.signinUser= async(req,res)=>{
//  const email = cryptr.encrypt(req.body.email);
     

      const {email,password}= req.body;
    // const email=req.body.email;
    // const password=req.body.password;

    try{
        // const encryptedString=   cryptr.encrypt(req.body.email);
        
        const user =await mod.findOne({email});
        // const user =await mod.findOne({encryptedString});
        // console.log(encryptedString)
        // console.log(user);
        if(!user){
            return res.status(401).json({success:false,
                error:'User not Found, Try signup'
            });
        }
        const isMatch = await user.comparePassword(password);
    
        console.log(isMatch);
        if(!isMatch){
            return res
            .status(401)
            .json({success:false, error:'Email/Password dont Match'});
        }
     
        const token= signToken(user._id);
        console.log(token);
        res.cookie('auth_token',token,{
            httpOnly:true
        });
        user.token=token;
        const {firstname,lastname,role}=user;
       
        res.json({success:true, user:{firstname,lastname,email,role,token} });
   
    
    }catch(error){
        res.status(500).json({success:false, error:'Some error occurred'});
    }
}; 

exports. signOut=(req,res)=>{
    res.clearCookie('auth_token');
    res.json({success:true})
}

  exports.token=async(req,res)=>{
      const id =req.user._id      
      
   const  data= await mod.findOne({_id:id})
       try{ 
        if (!data) {
          return res.status(404).send({
            message: "Message not found with id " + req.params.email,});
        }
        res.send(data);
    
     } catch(error){
        res.status(500).json({success:false, error:'Some error occurred'});
    }
  };

  
//Registeration link send to mail
  
  exports.link=async (req, res) => {
    try {
     

        const user = await mod.findOne({ email: req.body.email });
       
        console.log(user);
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        console.log(token);
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        // const link = process.env.BASE_URL+'password-reset/'+user._id+'/'+token.token;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};

exports.reset=async (req, res) => {
    try {
        

        const user = await mod.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        // user.password = req.body.password;
        var oldpassword=user.password;
        var newpassword=req.body.newpassword;
        var conformpassword=req.body.conformpassword;
        // const isMatch = await user.comparePassword(password);
        if(newpassword!=conformpassword){
            res.send('newpassword and conform password does not match');
        }
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};


//Resend email 
exports.resend=async (req, res) => {
    try {
     

        const user = await mod.findOne({ email: req.body.email });
        // console.log(req.body.email);
        console.log(user);
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        console.log(token);
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        // const link = process.env.BASE_URL+'password-reset/'+user._id+'/'+token.token;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};



//status update
exports.verifyUser = async(req,res)=>{
    try{
       const  decryptedString = cryptr.decrypt(req.params.encrypted);
const change_data1 = await mod.findOne({email:decryptedString})
        if(!change_data1)
        {
            res.send("changes are not updated");
        
        }
        else if(change_data1.active==true)
        {
            res.send("already status updated");
        }
        else
        {  change_data1.active=true;
            change_data1.save();
            res.json({success:true, change_data1});
        }
    }catch(err){
        res.send(err)
    }
}

//imageupload
exports.iupload=async(req,res,next)=>{
    // console.log(req.file);
    // res.json({success:1,profile_url:process.env.BASE_URL+'profile/'+'_'+req.file.filename})
    var x=new image();
    x.title=req.body.title;
    x.content=req.body.content;
    x.image=req.file.filename;
    x.save((err,doc)=>{
        if(!err){
        console.log('saved');
        res.json({success:1,profile_url:process.env.BASE_URL+'profile/'+'_'+req.file.filename})
        }
        else{
            console.log(err);
        }
    });
    
}

  
//profile update
exports.profileupdate=async (req, res) => {
    try {
     
      
      

       const id =req._id  
   
    
        const user = await mod.findOne({_id:id});
      
      
        if (!user)
            return res.status(400).send("user with given email doesn't exist");
         const profile1 = await new profile({
                                _id:user._id,
                               firstname:req.body.firstname,
                                lastname:req.body.lastname,
                                birthdate:req.body.birthdate,
                                address:req.body.address,
                                city:req.body.city,
                                state:req.body.state,
                                country:req.body.country,
                                // image:req.file.filename,
            }).save();
            res.send("profile update success")
           console.log(profile1)
        
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};

