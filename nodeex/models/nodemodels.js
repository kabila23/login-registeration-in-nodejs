const express=require('express');
const mongoose = require('mongoose');
// const bcrypt=require('bcrypt');
// const Cryptr = require('cryptr');
const Schema=mongoose.Schema;
const bcrypt = require('bcryptjs');
// const cryptr = new Cryptr('myTotalySecretKey');


const UserSchema = new mongoose.Schema({
  // name:String,
  // email:String,
  // password:String,
  // book: String,
  // price: Number,
//   userId:{
//     type:Schema.Types.ObjectId,
//     required:true,
//     ref:"user"
// },
  firstname:{
    type:String
    // required:true,
    // minlength:3,
    // maxlength:20,
    // trim:true,
  },
  lastname:{
    type:String
    // required:true,
    // minlength:3,
    // maxlength:20,
    // trim:true,
  },
  email:
  {
    type:String
    // required:true,
    // trim:true,
    // unique:true,
  },
  password:{
    type:String
    // required:true,
    // trim:true,
    // minlength:7,
  },

  role:{
    type:String,
    default:'user',
    enum:['user','admin'],
  },

  active: { 
    type: Boolean, 
    default: false 
  },

  profile:{
    type:String
  },

  createdAt: {
    type: Date,
    default: Date.now
},

});
UserSchema.pre('save',function(next){
  if(!this.isModified('password')){
    return next()
  }
  bcrypt.hash(this.password,10,(err,hashedPassword)=>{
    if(err) return next(err);
    this.password=hashedPassword;
    next();
  });

});


UserSchema.methods.comparePassword=function(password){
  if(password){
    return bcrypt.compare(password,this.password);
  }
  return false;
};


// UserSchema.methods.compareemail=function(email){
//   cryptr.encrypt(email)
//    if(email){
//      return compare(email,this.email)
//    }
//    return false;
//  };



module.exports=mongoose.model('User',UserSchema);
