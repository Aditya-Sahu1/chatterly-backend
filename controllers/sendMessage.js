const express = require("express");
const app = express();
const message_model = require("../models/message_model");
const {io}=require('../app')
const Joi=require('joi')
const messageSchema = Joi.object({
  message: Joi.string().min(1).required(),
  receiverId: Joi.string().required(),
  isImage: Joi.boolean().optional()
});


const sendMessage = async (req, res) => {
  try {
    const {error, value}=messageSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            success:false,
            msg:"Validation eror "+error.details[0].message
        });
    }
    const senderId=req.user._id;

    const receiverId=value.receiverId

    let newMessage = new message_model();

    newMessage.message=value.message
    newMessage.senderId=senderId
    newMessage.roomId=[senderId, receiverId].sort().join('_');
    // newMessage.isImage=value.isImage
    if ('isImage' in value) {
        newMessage.isImage = value.isImage;
    }


    await newMessage.save();
    io.to(receiverId).emit("receive_message", {
    senderId,
    newMessage,
    timestamp: new Date()
});

    return res.status(200).json({
      success: true,
      msg:"Message sent Successfuly",
      message:newMessage
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
        success:false,
        msg:"Server Error occured"
    });
  }
};

module.exports = sendMessage ;
