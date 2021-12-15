const express=require('express')
const router1=express.Router();
const cont=require('../controllers/nodecontroller1');
const router = require('./noderouter');
// router1.get("/demo1",cont.login);
// router.get("/demo2",cont.login1);
router1.post('/signup',cont.signupuser);
    
module.exports=router1;