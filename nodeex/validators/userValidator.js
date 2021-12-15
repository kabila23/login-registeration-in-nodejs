const {check,validationResult}= require('express-validator');

exports.userValidationResult=(req,res,next)=>{
    const result= validationResult(req);
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success:false,error:error});
    }

    next();
}

exports.userValidator =[
    check('firstname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('First name is required')
        .isAlphanumeric()
        .withMessage('first name is alphabet and numeric')
        .not()
        .isNumeric()
        .withMessage('only alpha numeric')
        .isLength({min:3, max:20})
        .withMessage('First name must be 3 to 20 characters long!'),
    check('lastname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Last name is required')
        .isAlphanumeric()
        .withMessage('last name is only alphabets and numeric')
        .not()
        .isNumeric()
        .withMessage('only alpha numeric')
        .isLength({min:3, max:20})
        .withMessage('Last name must be 3 to 20 characters long!'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .not()
        .isNumeric()
        .withMessage('Not only Number please enter valid email')
        .isString()
        .withMessage('Not only String please enter valid email')
        .isEmail()
        .withMessage('Please provide a valid Email!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
        })
    .withMessage('Password must be atleast 8 characters long! with lowercase 1,uppercase 1,special character1'),
    // check('mobileno')
    // .trim()
    // .not()
    // .isEmpty()
    // .withMessage('Number is required')
    // .not()
    // .isAlpha()
    // .withMessage('enter numbers only')
    // .isMobilePhone()
]


