const express=require('express');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ProfileSchema = new mongoose.Schema({
    // userId:{
    //     type:Schema.Types.ObjectId,
    //     required:true,
    //     ref:"user"
    // },
 
  firstname:
  {
    type:String
   
  },
  lastname:
  {
    type:String
 
  },
  email:
  {
    type:String
  
  },
  birthdate:
  {
    type:String
   
  },

  address:
  {
    type:String,
  
  },

  city: { 
    type:String
  },

  state:{
    type:String
  },
  country:{
    type:String
  },
  image:{
      type:String
  },

  createdAt: {
    type: Date,
    default: Date.now
},

});
module.exports=mongoose.model('profile',ProfileSchema);