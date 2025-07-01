const express = require("express");
const app = express();
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt= require('jsonwebtoken'); 


module.exports=async(req,res,next)=>{
    try{
        const user=await User.findOne({_id:req.user.id}).select("-password");
        res.status(401).json({
            success:true,  
            user:user
        });
    }
    catch(errr){
        console.log(errr.message)
        res.status(201).json({
            succes:false,
            msg:"server error"
        })
        next();
    }
};
