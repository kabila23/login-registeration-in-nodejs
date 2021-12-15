const bcrypt=require('bcrypt');

const saltround = 10;



exports. encryptGenerate = async(plainPassword)=>{
    const salt = await bcrypt.genSalt(saltround);
    const encript = await bcrypt.hash(plainPassword,salt);
    return encript;
}

exports. encryptvalidation =async (plainPassword,encryptPassword)=>{
    return await bcrypt.compare(plainPassword,encryptPassword)
}
// module.exports.encryptGenerate=encryptGenerate;


 
