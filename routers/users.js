const express = require("express");
const app = express();
const userRouter=express.Router();
const jwt=require('../middlewares/jwt_user_token')

const allusers=require('../controllers/collect_users')
const sendMessage=require('../controllers/sendMessage')
const getMessages=require('../controllers/getMessages')

userRouter.route("/allusers").get(jwt,allusers);
userRouter.route("/sendMessage").post(jwt,sendMessage);
userRouter.route("/getMessages").get(jwt,getMessages);
module.exports=userRouter;