const jwt = require('jsonwebtoken');
const User = require('../models/user.model');   
const e = require('express');

let CheckToken = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(token){
            if(token.startsWith('Bearer')){
                token = token.slice(7,token.length);
                jwt.verify(token,process.env.SCECRET_KEY,(err,decoded)=>{
                    if(err){
                        return res.status(401).json({message:"Token is not valid"});
                    }else{
                        req.decoded = decoded;
                        next();
                    }
                });
            }
        }else{
            return res.status(401).json({message:"Token is required"});
        }
    }catch(error){
        console.log(error);
    }

}

const checkAdminRole = async (userID) => {
    try{
         const user = await User.findById(userID);
         if(user.role === 'admin'){
             return true;
         }
    }catch(err){
         return false;
    }
 }

module.exports = {
    CheckToken,
    checkAdminRole
}