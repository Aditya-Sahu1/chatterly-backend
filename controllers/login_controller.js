const express=require('express');
const app= express();
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt= require('jsonwebtoken')


const controller_login=  async (req,res,next)=>{
    
    try {
    const{email,password}=req.body;
    let user = await User.findOne({ email: email });
    if ( !user) {
      return res.json({
        success: false,
        msg: "user does not exist.", 
      });
    }
    const matched= await bcryptjs.compare(password,user.password);
    if(!matched){
        return res.status(200).json({
            succes:false,
            msg:"Invalid password"
        });
    };

    const payload={
      user:{
        _id:user._id,
        email:user.email
      }
    };
    jwt.sign(payload,process.env.JWT_USER_SECRET,{
      expiresIn:360000
    },(err,token)=>{
      if(err)throw err;
      res.status(200).json({
        success:true,
        // msg:"User Logged In",
        token:token,
        _id:user._id
       });
       
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(201).json({
        success:false,
        msg:"Server error"
    });
  }
};

module.exports=controller_login;

