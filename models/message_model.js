const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    roomId:{
        type:String,
        required:true
    },

    senderId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },

    isImage:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});
messageSchema.index({roomId:1,timestamp:-1});

module.exports=mongoose.model("Message",messageSchema);