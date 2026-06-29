const usermodel = require('../models/user.models');
const jwt = require('jsonwebtoken');

async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await usermodel.findbyID(decoded.id);
        req.user = user;
        return next();
    }catch{
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }
}
module.exports = {
    authMiddleware
}