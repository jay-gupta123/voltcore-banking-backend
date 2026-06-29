const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.services');

/**
 * 
 * -- UserRegister Controller
 * --Post api/auth/register
 * 
 */
async function UserRegister(req,res){
    const {name,email,password} = req.body;
    const isexit = await userModel.findOne({email});
    if(isexit){
        return res.status(422).json({message: 'User already exists',status:'Failed'});
    }
    const user = await userModel.create({
        name,email,password
    });
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'3d'});  //process.env.JWT_SECRET_KEY is an environment variable that holds the secret key used for signing the JWT. This key should be kept secure and not hardcoded in the codebase. It is used to ensure that the token is valid and has not been tampered with. The expiresIn option specifies the duration for which the token will be valid, in this case, 3 days. and here procees indicates that we are accessing the environment variable from the process object, which is a global object in Node.js that provides information about the current Node.js process. The env property of the process object is an object that contains the user environment, including environment variables. By using process.env.JWT_SECRET_KEY, we can access the value of the JWT_SECRET_KEY environment variable and use it to sign the JWT token.
   res.cookie('token', token, {
    httpOnly: true,
    secure: true
});

    res.status(201).json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        },
        token
    }) 

    await emailService.sendRegistrationEmail(user.email, user.name);
}

/**
 * -- UserLogin Controller
 * --Post api/auth/login
 */
async function UserLogin(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(404).json({message: 'User not found',status:'Failed'});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid credentials',status:'Failed'});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'3d'});
   res.cookie('token', token, {
    httpOnly: true,
    secure: true
});
    res.status(200).json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        },
        token
    }) 
}
module.exports = {
    UserRegister,
    UserLogin
};