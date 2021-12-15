const User=require('../models/nodemodels')
// exports.login=(req,res)=>{
//     res.send('hi hello!!')
// }
// exports.login1=(req,res)=>{
//     res.send("welcome")
// }
exports.signupuser=async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success:false,error:'this email is already in use'});
    }
    const newuser=new User({
         firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
    })
    await newuser.save();
    res.status(201).json({success:true});
};
// const createstudent =  async (req, res) => {

//     const newstudent = new mod({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password,
//         book:req.body.book,
//         price:req.body.price,
       

//     })
//     try {
//         await newstudent.save();

//         res.status(201).json(newstudent);

//     } catch(error) {
//         res.status(400).json({ message : error.message});
//     }

// }