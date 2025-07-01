const messageModel = require("../models/message_model");

const getMessagesController = async (req, res) => {
  try {
   

    const senderId = req.user._id;
    const receiverId = req.query.receiverId;
     if (!receiverId) {
      return res.status(400).json({
        success: false,
        msg: "receiverId is required",
      });
    }
    const roomId = [senderId, receiverId].sort().join("_");
    // let messages = await messageModel.find({ roomId: roomId }).sort({timestamp:1});
    let messages =await messageModel.find({ roomId }).select("-__v").sort({ timestamp: 1 });

    return res.status(200).json({
      success: true,
      msg: "Messages Fetched Successfuly",
      messages: messages,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};
module.exports = getMessagesController;
