const express=require('express');
const mongoose = require('mongoose');
imageSchema=new mongoose.Schema({
    title:String,
    content:String,
    image:String,
});
module.exports=mongoose.model('image',imageSchema);
