const accountmodel = require('../models/account.model');

async function createAccount(req,res){
    const user = req.user;
    if(!user){
        return res.status(401).json({message: 'Unauthorized'})
    }

    try{
        const account = await accountmodel.create({
        user:user._id,
    })
    res.status(201).json(account);
}
catch(err){
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'})
}
module.exports = {  
    createAccount
}