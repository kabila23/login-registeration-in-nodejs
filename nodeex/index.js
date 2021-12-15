
require('dotenv').config();
var express=require('express')
const bodyParser=require('body-parser')
const cookieparser=require('cookie-parser')
const app=express();
const mongoose = require("mongoose");


// app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

mongoose.connect(process.env.DB_URL).then((reponses)=>{
    console.log("db connected success");
}).catch(error=>{
    console.log("some thing error : ",error);
});



// function errHandler(err,req,res,next){
//     if(err instanceof multer.MulterError){
//         res.json({
//             success:0,
//             message:err.message
//         })
//     }
// }
// app.use(errHandler);
const noderouter=require('./routers/noderouter');
app.use('/',noderouter);
// const noderouter1=require('./routers/noderouter1');
// app.use('/api',noderouter1);
app.listen(5050,function(){
    console.log('listening to port 6000');
});