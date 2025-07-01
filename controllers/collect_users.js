const express = require("express");
const app = express();
const User = require("../models/user");



const allusers=  async (req,res)=>{
    console.log("Decoded user from token:", req.user);

    
    try {
        let allUserrs = await User.find({_id:{$ne:req.user._id}}).select("-password");
        if ( allUserrs.length==0) {
        return res.json({
            success: false,
            msg: "data does not exist.", 
        });
        }
        res.status(200).json({
            success:true,
            msg:"Users Fetched Succesfully",
            users:allUserrs
        });
        
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(500).json({
        success:false,
        msg:"Server error "+error
    });
  }
};

module.exports=allusers;

