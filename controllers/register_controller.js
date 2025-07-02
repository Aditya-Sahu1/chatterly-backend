const express = require("express");
const app = express();
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt= require('jsonwebtoken')


const controller_register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      
      return res.json({
        success: false,
        msg: "user already exists",
      });
      // return;
    }

    let user = new User();
    user.username = name;
    user.email = email;

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();

    // console.log(1111);

    const payload={
      user:{
        _id:user._id,
        email:user.email
      }
    };
    console.log(payload);
    jwt.sign(payload,process.env.JWT_USER_SECRET,{
      expiresIn:360000
    },(err,token)=>{
      if(err)throw err;
      return res.status(200).json({
        success:true,
        token:token,
        _id:user._id
       });
       
    });
    console.log("2222222");
    // return res.json({
    //   success: true,
    //   user: user,
    // });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    next(error);
  }
};

module.exports = controller_register ;
